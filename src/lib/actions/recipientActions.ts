"use server";

import { db } from "@/app/db";
import { currentUser } from "@clerk/nextjs/server";
import { PDFDocument, rgb } from "pdf-lib";
import fontKit from "@pdf-lib/fontkit";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import QRCode from "qrcode";
import sharp from "sharp";

type RecipientData = {
  name: string;
  email: string;
  courseId: string;
};

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_S3_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export async function addRecipient(data: RecipientData) {
  const auth = await currentUser();
  if (!auth) {
    throw new Error("Please Login First");
  }

  const user = await db.user.findFirst({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) {
    throw new Error("No User Found. Please login");
  }

  const course = await db.course.findUnique({
    where: {
      id: data.courseId,
    },
  });

  if (!course) {
    throw new Error("No Course Found");
  }

  try {
    //1) fetching  templates & badges from R2 bucket and create a buffer
    const certRes = await fetch(course.templateUrl);
    if (!certRes.ok) throw new Error("Failed to fetch certificate template");
    const certBuffer = await certRes.arrayBuffer();

    const badge = await fetch(course.badgeUrl);
    if (!badge.ok) {
      throw new Error("Failed to fetch badge template");
    }
    const badgeBuffer = await badge.arrayBuffer();

    //1A) Get dimensions of the template
    const certMetadata = await sharp(Buffer.from(certBuffer)).metadata();
    const certWidth = certMetadata.width || 2480;
    const certHeight = certMetadata.height || 3508;

    //1B) Resize badge width to 200px
    const resizedBadge = await sharp(Buffer.from(badgeBuffer))
      .resize(600)
      .toBuffer();

    console.log("done step-1");

    // creating file name for embedding into qr
    const fileName = `${data.name.replace(/\s+/g, "_")}-certificate.pdf`;
    const fileUrl = `${process.env.R2_PUBLIC_ENDPOINT}/${fileName}`;

    // 2) Generate QR as a buffer and resize it to 200 * 200
    const qrBuffer = await QRCode.toBuffer(fileUrl);
    const resizedQR = await sharp(qrBuffer).resize(200, 200).toBuffer();
    console.log("done step-2");

    // 3) Overlay QR and Badge on the template
    const processedImage = await sharp(Buffer.from(certBuffer))
      .composite([
        { input: resizedQR, top: certHeight - 350, left: certWidth - 500 },
        { input: resizedBadge, top: certHeight - 550, left: 200 },
      ])
      .toBuffer();
    console.log("done step-3");

    // 4) Convert Image to PDF & Add Text
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontKit);
    const page = pdfDoc.addPage([certWidth, certHeight]);

    //Fetching Font to use
    const fontRes = await fetch(
      "https://github.com/google/fonts/raw/main/ofl/alexbrush/AlexBrush-Regular.ttf"
    );
    const slabRes = await fetch(
      "https://fonts.gstatic.com/s/robotoslab/v24/BngMUXZYTXPIvIBgJJSb6ufN5qU.woff2"
    );
    const fontBytes = await fontRes.arrayBuffer();
    const slabBytes = await slabRes.arrayBuffer();

    // Embed the font into the PDF
    const alexBrushFont = await pdfDoc.embedFont(fontBytes);
    const slabFont = await pdfDoc.embedFont(slabBytes);

    // Embed the processed image (certificate with QR & badge)
    const imgEmbed = await pdfDoc.embedPng(processedImage);
    page.drawImage(imgEmbed, {
      x: 0,
      y: 0,
      width: certWidth,
      height: certHeight,
    });

    console.log("done step-4");

    // 4A) Add Student Name (Above Center Line)
    page.drawText(data.name, {
      x: certWidth / 2 - 400,
      y: certHeight / 2 + 50,
      size: 140,
      font: alexBrushFont,
      color: rgb(0.137, 0.204, 0.369),
    });
    console.log("done step-4A");

    // 4B) Add Course Name & Description (Below Line)
    page.drawText(
      `For successfully completing the ${course.name} course with distinction.`,
      {
        x: certWidth / 2 - 550,
        y: certHeight / 2 - 60,
        size: 30,
        font: slabFont,
        color: rgb(0.231, 0.227, 0.231),
      }
    );
    console.log("done step-4B");

    const pdfBytes = await pdfDoc.save();

    // 5) Upload PDF to Cloudflare R2
    await r2.send(
      new PutObjectCommand({
        Bucket: "certificate-management-system",
        Key: fileName,
        Body: pdfBytes,
        ContentType: "application/pdf",
      })
    );
    console.log("done step-5");

    const recipent = await db.recipient.create({
      data: {
        name: data.name,
        email: data.email,
        courseId: data.courseId,
      },
    });

    await db.certificate.create({
      data: {
        recipientId: recipent.id,
        courseId: course.id,
        qrCodeUrl: fileUrl,
        pdfUrl: fileUrl,
      },
    });

    return fileUrl;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create a recipent or generate a certificate");
  }
}

export async function bulkUploadRecipients() {
  return { message: "this feature is under development!" };
}

export async function getRecipients() {
  const auth = await currentUser();
  if (!auth) {
    throw new Error("Please Login First");
  }

  const user = await db.user.findFirst({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) {
    throw new Error("No User Found. Please login");
  }

  const recipientsData = await db.recipient.findMany({
    include: {
      certificate: true,
      course: true,
    },
  });

  const recipients = recipientsData.map((val) => {
    return {
      id: val.id,
      name: val.name,
      email: val.email,
      courseName: val.course.name,
      certificateUrl: val.certificate?.qrCodeUrl,
    };
  });

  return recipients;
}
