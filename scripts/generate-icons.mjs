import sharp from 'sharp';

const input = 'public/logo.svg';
await sharp(input).resize(192, 192).png().toFile('public/icons/icon-192.png');
await sharp(input).resize(512, 512).png().toFile('public/icons/icon-512.png');
await sharp(input).resize(512, 512).png().toFile('public/icons/icon-512-maskable.png');
