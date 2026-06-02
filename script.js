/**
 * Fungsi ini adalah "jembatan". 
 * Nantinya, script di dalam game (biasanya C# atau JS bawaan RAGE:MP/FiveM)
 * akan memanggil fungsi ini secara terus-menerus untuk mengirim data mobil.
 */
function updateVehicleHUD(speed, rpm, fuel) {
    // 1. Update teks kecepatan
    document.getElementById('speed').innerText = Math.round(speed);

    // 2. Update panjang bar RPM (Asumsi maksimal RPM adalah 10000)
    let rpmPercentage = (rpm / 10000) * 100;
    // Mencegah bar tembus lebih dari 100%
    if(rpmPercentage > 100) rpmPercentage = 100; 
    document.getElementById('rpm-bar').style.width = rpmPercentage + '%';

    // 3. Update panjang bar bensin
    document.getElementById('fuel-bar').style.width = fuel + '%';
}

/** 
 * ==========================================
 * MODE TESTING UNTUK BROWSER LOKAL
 * ==========================================
 * Hapus atau berikan komentar (//) pada blok kode di bawah ini 
 * jika file sudah dimasukkan ke dalam folder resource game. 
 * Ini hanya untuk melihat efek animasinya saat kamu buka index.html di Google Chrome.
 */
