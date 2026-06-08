/* ============================================================
   VIAOPS — certificate.js
   Certificate generation on 9/9 completion
   ============================================================ */

const Certificate = {
  check() {
    const completed = Progress.getCompleted();
    if (completed === MODULES.length) {
      this.showModal();
    }
  },

  showModal() {
    // Check if already shown this session
    if (sessionStorage.getItem('viaops-cert-shown')) {
      return;
    }
    sessionStorage.setItem('viaops-cert-shown', 'true');

    const modal = `
      <div class="cert-overlay" id="cert-modal">
        <div class="cert-modal">
          <div class="cert-header">
            <h3>🏆 Félicitations !</h3>
            <button class="cert-close" onclick="Certificate.closeModal()">✕</button>
          </div>
          <div class="cert-body">
            <p class="cert-congrats">
              Vous avez terminé les <strong>9 modules ViaOps</strong> ! 🎉
            </p>
            <p class="cert-desc">
              Générez votre certificat de complétion personnalisé pour valoriser votre parcours DevOps.
            </p>
            <div class="cert-form">
              <label for="cert-name">Votre nom</label>
              <input 
                type="text" 
                id="cert-name" 
                placeholder="Ex: Limamou Laye"
                maxlength="50"
              />
            </div>
            <div class="cert-actions">
              <button class="btn-ghost" onclick="Certificate.closeModal()">
                Plus tard
              </button>
              <button class="btn-primary" onclick="Certificate.generate()">
                Générer le certificat
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modal);

    // Focus input
    setTimeout(() => {
      document.getElementById('cert-name').focus();
    }, 300);

    // Enter key to generate
    document.getElementById('cert-name').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.generate();
      }
    });
  },

  closeModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
      modal.classList.add('closing');
      setTimeout(() => modal.remove(), 200);
    }
  },

  generate() {
    const nameInput = document.getElementById('cert-name');
    const name = nameInput.value.trim();

    if (!name) {
      nameInput.classList.add('error');
      nameInput.focus();
      setTimeout(() => nameInput.classList.remove('error'), 500);
      return;
    }

    // Create certificate SVG
    const svg = this.createSVG(name);
    
    // Download as PNG
    this.downloadPNG(svg, name);
    
    // Close modal
    this.closeModal();
  },

  createSVG(name) {
    const date = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return `
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="800" fill="#FAFAFA"/>
  
  <!-- Border -->
  <rect x="40" y="40" width="1120" height="720" fill="none" stroke="#8B5CF6" stroke-width="3"/>
  <rect x="50" y="50" width="1100" height="700" fill="none" stroke="#E0E0E0" stroke-width="1"/>
  
  <!-- Logo V -->
  <rect x="570" y="100" width="60" height="60" rx="8" fill="#8B5CF6"/>
  <text x="600" y="142" font-family="IBM Plex Sans" font-size="36" font-weight="700" fill="white" text-anchor="middle">V</text>
  
  <!-- Title -->
  <text x="600" y="220" font-family="IBM Plex Sans" font-size="24" font-weight="600" fill="#555555" text-anchor="middle">CERTIFICAT DE COMPLÉTION</text>
  
  <!-- Divider -->
  <line x1="350" y1="250" x2="850" y2="250" stroke="#8B5CF6" stroke-width="2"/>
  
  <!-- Text -->
  <text x="600" y="310" font-family="IBM Plex Sans" font-size="18" fill="#555555" text-anchor="middle">Ce certificat atteste que</text>
  
  <!-- Name -->
  <text x="600" y="380" font-family="IBM Plex Sans" font-size="48" font-weight="700" fill="#1A1A1A" text-anchor="middle">${this.escapeXML(name)}</text>
  
  <!-- Achievement -->
  <text x="600" y="440" font-family="IBM Plex Sans" font-size="18" fill="#555555" text-anchor="middle">a terminé avec succès le parcours</text>
  <text x="600" y="480" font-family="IBM Plex Sans" font-size="32" font-weight="600" fill="#8B5CF6" text-anchor="middle">ViaOps DevOps</text>
  
  <!-- Description -->
  <text x="600" y="540" font-family="IBM Plex Sans" font-size="16" fill="#777777" text-anchor="middle">9 modules · Docker, Kubernetes, Jenkins, Terraform,</text>
  <text x="600" y="565" font-family="IBM Plex Sans" font-size="16" fill="#777777" text-anchor="middle">SonarQube, Prometheus, Trivy, IA pour DevOps</text>
  
  <!-- Date -->
  <text x="600" y="640" font-family="IBM Plex Sans" font-size="16" fill="#999999" text-anchor="middle">Délivré le ${date}</text>
  
  <!-- Footer -->
  <text x="600" y="710" font-family="IBM Plex Mono" font-size="14" fill="#AAAAAA" text-anchor="middle">viaops.dev · Dakar, Sénégal</text>
</svg>
    `.trim();
  },

  escapeXML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  },

  downloadPNG(svgString, name) {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Create image from SVG
    const img = new Image();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      
      // Download
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        const fileName = `ViaOps_Certificat_${name.replace(/\s+/g, '_')}.png`;
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        link.click();
        
        URL.revokeObjectURL(url);
        URL.revokeObjectURL(link.href);
        
        // Show success message
        this.showSuccess();
      });
    };

    img.src = url;
  },

  showSuccess() {
    const toast = document.createElement('div');
    toast.className = 'cert-toast';
    toast.innerHTML = '✓ Certificat téléchargé avec succès !';
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
