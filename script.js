// DATA INTI APLIKASI
let campaigns = [
  {
    id: 1,
    title: "1.000 Mangrove untuk Pesisir Tangsel",
    category: "mangrove",
    description: "Inisiatif restorasi ekosistem pesisir dengan menanam 1.000 bibit mangrove untuk mencegah abrasi pantai dan menciptakan habitat keanekaragaman hayati baru.",
    target: 25000000,
    raised: 18450000,
    donorsCount: 142,
    daysLeft: 12,
    location: "Kawasan Pesisir, Tangerang Selatan",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    author: "Koalisi Hijau Pamulang",
    updates: [
      { date: "10 Mei 2026", text: "Pembelian bibit mangrove tahap pertama sebanyak 400 pohon telah selesai." },
      { date: "02 Mei 2026", text: "Survei kelayakan tanah pesisir bersama dinas kehutanan." }
    ]
  },
  {
    id: 2,
    title: "Edukasi Pengelolaan Sampah Kreatif RT/RW",
    category: "waste",
    description: "Program pelatihan pemilahan sampah organik & non-organik di 10 RW percontohan Tangsel, lengkap dengan pengadaan tong sampah komparatif dan komposter mini.",
    target: 15000000,
    raised: 9200000,
    donorsCount: 88,
    daysLeft: 24,
    location: "Kecamatan Ciputat, Tangsel",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    author: "Pemuda Penggerak Waste-to-Worth",
    updates: [{ date: "12 Mei 2026", text: "Penyusunan modul saku pengelolaan sampah rumah tangga siap cetak." }]
  },
  {
    id: 3,
    title: "Bank Sampah Digital Remaja Serpong",
    category: "waste",
    description: "Pengembangan sistem digitalisasi bank sampah untuk memotivasi anak muda mengumpulkan sampah plastik yang nantinya bisa dikonversi menjadi saldo e-wallet.",
    target: 30000000,
    raised: 5400000,
    donorsCount: 31,
    daysLeft: 45,
    location: "Serpong, Tangerang Selatan",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800",
    author: "Himpunan Mahasiswa Lingkungan Tangsel",
    updates: []
  }
];

const educationalArticles = [
  { id: 1, title: "Mengapa Mangrove Adalah Benteng Terbaik Pesisir Kita?", summary: "Mangrove tidak hanya mencegah abrasi, tetapi juga menyerap karbon hingga 4 kali lebih banyak.", category: "Mangrove", author: "Sarah Amelia", date: "14 Mei 2026", readTime: "5 menit baca" },
  { id: 2, title: "Panduan Mudah Membuat Kompos di Rumah Sempit", summary: "Lahan terbatas di kota seperti Tangerang Selatan bukan halangan untuk mengolah sampah organik.", category: "Sampah", author: "Rian Hidayat", date: "10 Mei 2026", readTime: "7 menit baca" },
  { id: 3, title: "Mengenal Mikroplastik dan Dampaknya di Perairan Tangsel", summary: "Hasil riset terbaru menunjukkan kontaminasi mikroplastik mulai masuk ke rantai makanan.", category: "Edukasi", author: "Dr. Budi Santoso", date: "05 Mei 2026", readTime: "6 menit baca" }
];

let selectedCampaignId = null;

// INISIALISASI SAAT DOM SIAP
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initChart();
  initTabs();
  animateCounters();
  renderTeasers();
  renderCampaigns();
  renderArticles();
});

// PENGATURAN TABS/NAVIGASI
void function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}();

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
  const targetSection = document.getElementById(`tab-${tabId}`);
  if (targetSection) targetSection.classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.className = "nav-btn px-4 py-2 rounded-lg font-medium bg-emerald-50 text-emerald-700 transition-colors";
    } else {
      btn.className = "nav-btn px-4 py-2 rounded-lg font-medium text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-colors";
    }
  });
}

// FORMAT RUPIAH
function formatRupiah(value) {
  return "Rp " + Math.floor(value).toLocaleString('id-ID');
}

// TOAST NOTIFIKASI
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const txt = document.getElementById('toast-message');
  txt.innerText = message;
  toast.className = `fixed bottom-6 right-6 z-50 flex items-center p-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 ${
    type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
  } text-white`;

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 4000);
}

// MODAL CONTROLLER
function toggleModal(modalId, isOpen) {
  const modal = document.getElementById(modalId);
  if (isOpen) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

// RECHARTS REPLACEMENT (CHART.JS)
function initChart() {
  const ctx = document.getElementById('impactChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'],
      datasets: [
        { label: 'Mangrove Ditanam', data: [120, 250, 480, 750, 1150], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', fill: true, tension: 0.3 },
        { label: 'Sampah Terkelola (kg)', data: [450, 700, 1100, 1650, 2400], borderColor: '#0d9488', backgroundColor: 'rgba(13, 148, 136, 0.1)', fill: true, tension: 0.3 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// ANIMASI COUNTER ANGKA BERANDA
function animateCounters() {
  document.querySelectorAll('.animate-counter').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = target / 100;
    const updateCount = () => {
      count += speed;
      if (count < target) {
        counter.innerText = Math.floor(count).toLocaleString('id-ID');
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target.toLocaleString('id-ID');
      }
    };
    updateCount();
  });
}

// RENDER KAMPANYE DI HOMEPAGE
function renderTeasers() {
  const container = document.getElementById('teaser-grid');
  container.innerHTML = campaigns.slice(0, 3).map(camp => {
    const percent = Math.min(100, Math.round((camp.raised / camp.target) * 100));
    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full">
        <img src="${camp.image}" class="w-full h-48 object-cover" />
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-slate-800 text-lg mb-2">${camp.title}</h3>
            <p class="text-sm text-slate-500 line-clamp-3">${camp.description}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-100 space-y-4">
            <div class="w-full bg-slate-100 h-2 rounded-full"><div class="bg-emerald-500 h-2 rounded-full" style="width: ${percent}%"></div></div>
            <div class="flex justify-between items-center">
               <div><span class="block text-xs text-slate-400">Terkumpul</span><strong class="text-sm">${formatRupiah(camp.raised)}</strong></div>
               <button onclick="openDonationModal(${camp.id})" class="bg-emerald-600 text-white text-xs px-4 py-2 rounded-xl font-bold">Beri Donasi</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// RENDER KAMPANYE DI HALAMAN UTAMA (DENGAN DETAIL EXPANDABLE)
function renderCampaigns() {
  const container = document.getElementById('campaigns-list');
  const searchVal = document.getElementById('search-input').value.toLowerCase();
  
  const filtered = campaigns.filter(c => c.title.toLowerCase().includes(searchVal));

  container.innerHTML = filtered.map(camp => {
    const percent = Math.min(100, Math.round((camp.raised / camp.target) * 100));
    const isSelected = selectedCampaignId === camp.id;
    
    return `
      <div class="bg-white rounded-3xl overflow-hidden border ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-slate-100'}" onclick="selectCampaign(${camp.id})">
        <div class="flex flex-col md:flex-row">
          <img src="${camp.image}" class="w-full md:w-64 h-52 object-cover" />
          <div class="p-6 flex-grow flex flex-col justify-between">
            <div>
              <h3 class="font-bold text-slate-800 text-xl hover:text-emerald-600">${camp.title}</h3>
              <p class="text-sm text-slate-500 line-clamp-2">${camp.description}</p>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-100">
               <div class="w-full bg-slate-100 h-2 rounded-full mb-2"><div class="bg-emerald-500 h-2 rounded-full" style="width: ${percent}%"></div></div>
               <div class="text-xs text-slate-500"><strong>${formatRupiah(camp.raised)}</strong> dari ${formatRupiah(camp.target)} (${percent}%)</div>
            </div>
          </div>
        </div>
        ${isSelected ? `
          <div class="bg-slate-50 p-6 border-t border-slate-100 space-y-4" onclick="event.stopPropagation()">
            <p class="text-sm text-slate-600">${camp.description}</p>
            <div class="grid grid-cols-2 gap-4 text-xs bg-white p-4 rounded-xl border border-slate-100">
              <div><span class="text-slate-400">Penggagas:</span> <span class="font-bold block">${camp.author}</span></div>
              <div><span class="text-slate-400">Donatur:</span> <span class="font-bold block">${camp.donorsCount} Orang</span></div>
            </div>
            <button onclick="openDonationModal(${camp.id})" class="bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm w-full">Kirim Donasi</button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function selectCampaign(id) {
  selectedCampaignId = selectedCampaignId === id ? null : id;
  renderCampaigns();
}

// BUKA DIALOG DONASI
function openDonationModal(id) {
  const camp = campaigns.find(c => c.id === id);
  if (!camp) return;
  document.getElementById('donate-modal-title').innerText = camp.title;
  document.getElementById('donationForm').setAttribute('data-id', id);
  toggleModal('donate-modal', true);
}

// PROSES SUBMIT DONASI
function handleDonationSubmit(e) {
  e.preventDefault();
  const id = +e.target.getAttribute('data-id');
  const amount = +document.getElementById('d-amount').value;
  
  campaigns = campaigns.map(c => {
    if (c.id === id) {
      return { ...c, raised: c.raised + amount, donorsCount: c.donorsCount + 1 };
    }
    return c;
  });

  toggleModal('donate-modal', false);
  showToast(`Terima kasih! Donasi sebesar ${formatRupiah(amount)} sukses diproses.`);
  renderTeasers();
  renderCampaigns();
}

// PROSES GALANG DANA BARU
function handleCreateCampaign(e) {
  e.preventDefault();
  const title = document.getElementById('c-title').value;
  const category = document.getElementById('c-category').value;
  const target = +document.getElementById('c-target').value;
  const location = document.getElementById('c-location').value || 'Tangerang Selatan';
  const author = document.getElementById('c-author').value;
  const description = document.getElementById('c-description').value;

  const newCampaign = {
    id: campaigns.length + 1,
    title, category, description, target, raised: 0, donorsCount: 0, daysLeft: 60,
    location, author, updates: [],
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800"
  };

  campaigns.unshift(newCampaign);
  toggleModal('create-modal', false);
  showToast('Proyek kampanye baru Anda berhasil diterbitkan!');
  renderTeasers();
  renderCampaigns();
  e.target.reset();
}

// PENDAFTARAN RELAWAN
function handleVolunteerSubmit(e) {
  e.preventDefault();
  showToast('Pendaftaran relawan dikirim! Koordinator kami akan segera menghubungi WhatsApp Anda.');
  e.target.reset();
}

// ARTIKEL EDUKASI
function renderArticles() {
  const container = document.getElementById('articles-grid');
  container.innerHTML = educationalArticles.map(art => `
    <article class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
      <div class="space-y-4">
        <span class="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">${art.category}</span>
        <h4 class="font-bold text-slate-900 text-lg">${art.title}</h4>
        <p class="text-sm text-slate-500">${art.summary}</p>
      </div>
      <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-400">
        <span>Oleh: <strong>${art.author}</strong></span><span>${art.readTime}</span>
      </div>
    </article>
  `).join('');
}

// INTEGRASI API GEMINI (AI GENERATE COPY)
async function generateAICopy() {
  const prompt = document.getElementById('aiPrompt').value.trim();
  if (!prompt) return showToast('Masukkan ide kampanye terlebih dahulu!', 'error');

  const btn = document.getElementById('btn-ai-copy');
  btn.innerText = "Sedang Merancang...";
  btn.disabled = true;

  try {
    const userQuery = `Buatlah draf promosi kampanye lingkungan terstruktur untuk: "${prompt}". Pakai sentuhan khas anak muda Tangerang Selatan yang peduli ekologi kota.`;
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: userQuery }] }] })
    });

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      document.getElementById('ai-results').classList.remove('hidden');
      const box = document.getElementById('result-text-box');
      box.classList.remove('hidden');
      document.getElementById('aiResponseText').innerText = text;
      showToast('Naskah berhasil dirancang oleh AI Gemini!');
    }
  } catch (err) {
    showToast('Gagal menghubungi AI.', 'error');
  } finally {
    btn.innerText = "Buat Naskah Kampanye";
    btn.disabled = false;
  }
}

// INTEGRASI API IMAGEN (AI GENERATE POSTER IMAGE)
async function generateAIImage() {
  const prompt = document.getElementById('aiImagePrompt').value.trim();
  if (!prompt) return showToast('Tuliskan visualisasi gambar poster!', 'error');

  const btn = document.getElementById('btn-ai-image');
  btn.innerText = "Sedang Menggambar...";
  btn.disabled = true;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: { prompt: `Graphic professional vector illustration, environmental theme, showing ${prompt}` },
        parameters: { sampleCount: 1 }
      })
    });

    const result = await response.json();
    const base64 = result.predictions?.[0]?.bytesBase64Encoded;
    if (base64) {
      document.getElementById('ai-results').classList.remove('hidden');
      const box = document.getElementById('result-img-box');
      box.classList.remove('hidden');
      document.getElementById('aiResponseImg').src = `data:image/png;base64,${base64}`;
      showToast('Gambar poster sukses dibuat oleh AI Imagen!');
    }
  } catch (err) {
    showToast('Gagal memproses gambar via AI.', 'error');
  } finally {
    btn.innerText = "Hasilkan Ilustrasi AI";
    btn.disabled = false;
  }
}