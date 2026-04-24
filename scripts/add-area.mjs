import fs from 'node:fs';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("\x1b[36m%s\x1b[0m", "\n--- Kutabaru pSEO Content Helper ---");
  
  try {
    const cityName = await question("Nama Wilayah (e.g. Brebes Kota): ");
    if (!cityName) throw new Error("Nama wilayah wajib diisi.");

    const id = cityName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const latStr = await question("Latitude (e.g. -6.8710): ");
    const lat = parseFloat(latStr);
    
    const lngStr = await question("Longitude (e.g. 109.0452): ");
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error("Latitude dan Longitude harus berupa angka.");
    }

    const description = await question("Deskripsi Singkat SEO: ");
    const localLandmark = await question("Landmark Lokal (e.g. Alun-alun): ");
    const businessTrends = await question("Tren Bisnis Lokal (e.g. Kuliner Telur Asin): ");

    const data = {
      cityName,
      title: `Jasa Pembuatan Website ${cityName} - Profesional & SEO`,
      description: description || `Layanan jasa pembuatan website profesional di ${cityName} untuk meningkatkan omzet bisnis Anda.`,
      localContext: `Sebagai pusat aktivitas di wilayahnya, ${cityName} memiliki peluang ekonomi digital yang sangat menjanjikan bagi pelaku usaha lokal.`,
      nearbyAreas: [],
      whatsappMessage: `Halo, saya tertarik buat website untuk bisnis saya di ${cityName}.`,
      localLandmark: localLandmark || "Pusat Kota",
      businessTrends: businessTrends || "Digitalisasi UMKM Lokal",
      clientCountLocal: 0,
      lat,
      lng
    };

    const dir = './src/content/areas';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = `${dir}/${id}.json`;
    if (fs.existsSync(filePath)) {
      const confirm = await question(`File ${id}.json sudah ada. Overwrite? (y/n): `);
      if (confirm.toLowerCase() !== 'y') {
        console.log("❌ Dibatalkan.");
        rl.close();
        return;
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log("\x1b[32m%s\x1b[0m", `\n✅ Sukses! Data wilayah berhasil disimpan ke: ${filePath}`);
    console.log("Silakan jalankan 'npm run build' untuk memverifikasi data baru.");

  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", `\n❌ Error: ${error.message}`);
  } finally {
    rl.close();
  }
}

main();
