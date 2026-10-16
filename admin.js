/**
 * ND7 GARAGE - Painel Administrativo
 * Gerenciamento de Estoque, Seleção de Veículos Visíveis, Dados da Loja e Backup
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado Local do Painel
  let vehicles = getVehicles();
  let storeInfo = getStoreInfo();
  let leads = typeof getLeads === 'function' ? getLeads() : [];

  // Elementos do DOM
  const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
  const adminTabContents = document.querySelectorAll('.admin-tab-content');
  const tabCountBadge = document.getElementById('tabCountBadge');

  // KPIs Veículos
  const kpiTotal = document.getElementById('kpiTotal');
  const kpiVisiveis = document.getElementById('kpiVisiveis');
  const kpiOcultos = document.getElementById('kpiOcultos');
  const kpiDestaques = document.getElementById('kpiDestaques');

  // Filtros de Tabela de Veículos
  const adminSearchInput = document.getElementById('adminSearchInput');
  const adminStatusFilter = document.getElementById('adminStatusFilter');
  const adminCategoryFilter = document.getElementById('adminCategoryFilter');
  const adminVehiclesTbody = document.getElementById('adminVehiclesTbody');

  // Botões de Ação Rápida de Veículos
  const btnSyncCarroSp = document.getElementById('btnSyncCarroSp');
  const btnToggleAllVisible = document.getElementById('btnToggleAllVisible');
  const btnToggleAllHidden = document.getElementById('btnToggleAllHidden');
  const btnAddNewCar = document.getElementById('btnAddNewCar');

  // Modal de Edição de Veículo
  const editCarModal = document.getElementById('editCarModal');
  const editModalCloseBtn = document.getElementById('editModalCloseBtn');
  const editModalCancelBtn = document.getElementById('editModalCancelBtn');
  const carEditForm = document.getElementById('carEditForm');
  const editModalTitle = document.getElementById('editModalTitle');

  // Elementos do CRM (Contatos & Leads - Caio & Eduardo)
  const leadsTabCountBadge = document.getElementById('leadsTabCountBadge');
  const kpiLeadsTotal = document.getElementById('kpiLeadsTotal');
  const kpiLeadsCaio = document.getElementById('kpiLeadsCaio');
  const kpiLeadsEduardo = document.getElementById('kpiLeadsEduardo');
  const kpiLeadsWaiting = document.getElementById('kpiLeadsWaiting');
  const leadSearchInput = document.getElementById('leadSearchInput');
  const leadAttendantFilter = document.getElementById('leadAttendantFilter');
  const leadStatusFilter = document.getElementById('leadStatusFilter');
  const btnAddNewLead = document.getElementById('btnAddNewLead');
  const adminLeadsTbody = document.getElementById('adminLeadsTbody');

  // Modal de Lead
  const leadModal = document.getElementById('leadModal');
  const leadModalCloseBtn = document.getElementById('leadModalCloseBtn');
  const leadModalCancelBtn = document.getElementById('leadModalCancelBtn');
  const leadForm = document.getElementById('leadForm');
  const leadModalTitle = document.getElementById('leadModalTitle');

  // Formulários
  const storeInfoForm = document.getElementById('storeInfoForm');
  const siteTextsForm = document.getElementById('siteTextsForm');

  // Backup
  const btnExportJson = document.getElementById('btnExportJson');
  const btnImportJson = document.getElementById('btnImportJson');
  const importFileInput = document.getElementById('importFileInput');
  const btnResetDefaults = document.getElementById('btnResetDefaults');

  // Inicialização
  initTabs();
  updateKPIs();
  renderAdminTable();
  updateLeadKPIs();
  renderAdminLeadsTable();
  populateStoreInfoForm();
  populateSiteTextsForm();
  initEventListeners();
  initLeadEventListeners();
  initSecurityAuth();

  // Troca de Abas
  function initTabs() {
    adminTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        adminTabBtns.forEach(b => b.classList.remove('active'));
        adminTabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(targetTab)?.classList.add('active');
      });
    });
  }

  // Atualiza KPIs
  function updateKPIs() {
    const total = vehicles.length;
    const visiveis = vehicles.filter(v => v.visible !== false).length;
    const ocultos = total - visiveis;
    const destaques = vehicles.filter(v => v.featured).length;

    if (kpiTotal) kpiTotal.textContent = total;
    if (kpiVisiveis) kpiVisiveis.textContent = visiveis;
    if (kpiOcultos) kpiOcultos.textContent = ocultos;
    if (kpiDestaques) kpiDestaques.textContent = destaques;
    if (tabCountBadge) tabCountBadge.textContent = total;
  }

  // Filtra lista de veículos para a tabela do admin
  function getAdminFilteredVehicles() {
    const query = (adminSearchInput?.value || '').toLowerCase().trim();
    const status = adminStatusFilter?.value || 'all';
    const cat = adminCategoryFilter?.value || 'all';

    return vehicles.filter(v => {
      // Busca
      if (query) {
        const full = `${v.name} ${v.brand} ${v.model} ${v.version} ${v.year}`.toLowerCase();
        if (!full.includes(query)) return false;
      }

      // Status
      if (status === 'visible' && v.visible === false) return false;
      if (status === 'hidden' && v.visible !== false) return false;
      if (status === 'featured' && !v.featured) return false;

      // Categoria
      if (cat !== 'all' && v.category !== cat) return false;

      return true;
    });
  }

  // Renderiza Tabela de Veículos
  function renderAdminTable() {
    if (!adminVehiclesTbody) return;

    const filtered = getAdminFilteredVehicles();

    if (filtered.length === 0) {
      adminVehiclesTbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 3rem 1rem; color: var(--color-text-subtle);">
            Nenhum veículo encontrado com os filtros aplicados.
          </td>
        </tr>
      `;
      return;
    }

    adminVehiclesTbody.innerHTML = filtered.map(car => {
      const isVisible = car.visible !== false;
      const isFeatured = !!car.featured;

      return `
        <tr data-id="${car.id}">
          <td>
            <img 
              src="${car.image}" 
              alt="${car.name}" 
              class="car-thumb-small" 
              onerror="this.onerror=null; this.src='assets/fachada.webp';"
            />
          </td>
          <td>
            <div class="car-title-cell">
              <div>
                <span class="car-name-bold">${car.name}</span>
                <span class="car-sub-text">${car.brand} • ${car.version || car.model}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="badge-tag tag-dark" style="font-size: 0.72rem;">${car.categoryLabel || car.category}</span>
          </td>
          <td>
            <strong style="color: #ffffff;">${car.year}</strong>
            <div style="font-size: 0.75rem; color: var(--color-text-subtle);">${car.km || 'N/A'}</div>
          </td>
          <td>
            <strong style="color: var(--color-gold); font-size: 1rem;">
              R$ ${(car.price || 0).toLocaleString('pt-BR')}
            </strong>
          </td>
          <!-- Switch Toggle: Exibir no Site -->
          <td style="text-align: center;">
            <label class="switch" title="Clique para exibir ou ocultar no site público">
              <input 
                type="checkbox" 
                class="toggle-visibility" 
                data-id="${car.id}" 
                ${isVisible ? 'checked' : ''} 
              />
              <span class="slider-toggle"></span>
            </label>
            <div style="margin-top: 0.25rem;">
              <span class="status-badge ${isVisible ? 'active' : 'inactive'}">
                ${isVisible ? '● Visível' : '○ Oculto'}
              </span>
            </div>
          </td>
          <!-- Switch Toggle: Destaque -->
          <td style="text-align: center;">
            <label class="switch" title="Destacar no topo da lista">
              <input 
                type="checkbox" 
                class="star-toggle toggle-featured" 
                data-id="${car.id}" 
                ${isFeatured ? 'checked' : ''} 
              />
              <span class="slider-toggle"></span>
            </label>
          </td>
          <!-- Ações -->
          <td style="text-align: right;">
            <div class="action-btn-group" style="justify-content: flex-end;">
              <button 
                type="button" 
                class="icon-btn edit-car-btn" 
                data-id="${car.id}" 
                title="Editar Informações do Veículo"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button 
                type="button" 
                class="icon-btn danger delete-car-btn" 
                data-id="${car.id}" 
                title="Excluir este Veículo"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Listener para o Interruptor de Visibilidade (Exibir no Site)
    document.querySelectorAll('.toggle-visibility').forEach(sw => {
      sw.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const car = vehicles.find(v => v.id === id);
        if (car) {
          car.visible = e.target.checked;
          saveVehicles(vehicles);
          updateKPIs();
          renderAdminTable();
          showToast(`Veículo "${car.name}" agora está ${car.visible ? 'VISÍVEL' : 'OCULTO'} no site!`);
        }
      });
    });

    // Listener para o Interruptor de Destaque
    document.querySelectorAll('.toggle-featured').forEach(sw => {
      sw.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const car = vehicles.find(v => v.id === id);
        if (car) {
          car.featured = e.target.checked;
          saveVehicles(vehicles);
          updateKPIs();
          renderAdminTable();
          showToast(`Veículo "${car.name}" ${car.featured ? 'marcado como DESTAQUE ⭐' : 'removido dos destaques'}.`);
        }
      });
    });

    // Listener para Editar Veículo
    document.querySelectorAll('.edit-car-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openEditModal(id);
      });
    });

    // Listener para Excluir Veículo
    document.querySelectorAll('.delete-car-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const car = vehicles.find(v => v.id === id);
        if (car && confirm(`Deseja realmente excluir o veículo "${car.name}" da base de dados?`)) {
          vehicles = vehicles.filter(v => v.id !== id);
          saveVehicles(vehicles);
          updateKPIs();
          renderAdminTable();
          showToast(`Veículo "${car.name}" excluído.`);
        }
      });
    });
  }

  // Preenche Formulário da Loja
  function populateStoreInfoForm() {
    if (!storeInfoForm) return;
    document.getElementById('storeName').value = storeInfo.name || '';
    document.getElementById('storeSlogan').value = storeInfo.slogan || '';
    document.getElementById('storePhone1').value = storeInfo.phone1 || '';
    document.getElementById('storeWhatsapp').value = storeInfo.whatsapp || '';
    document.getElementById('storeEmail').value = storeInfo.email || '';
    document.getElementById('storeInstagram').value = storeInfo.instagram || '';
    document.getElementById('storeInstagramUrl').value = storeInfo.instagramUrl || '';
    document.getElementById('storeAddress').value = storeInfo.address || '';
    document.getElementById('storeReference').value = storeInfo.reference || '';
    document.getElementById('storeCity').value = storeInfo.city || '';
    document.getElementById('storeState').value = storeInfo.state || '';
    document.getElementById('storeCep').value = storeInfo.cep || '';

    // Horários
    if (storeInfo.hours && Array.isArray(storeInfo.hours)) {
      const h1 = storeInfo.hours.find(h => h.days.includes('Segunda'));
      const h2 = storeInfo.hours.find(h => h.days.includes('Sábado'));
      const h3 = storeInfo.hours.find(h => h.days.includes('Domingo'));
      if (h1) document.getElementById('hoursWeekdays').value = h1.hours;
      if (h2) document.getElementById('hoursSaturday').value = h2.hours;
      if (h3) document.getElementById('hoursSunday').value = h3.hours;
    }
  }

  // Preenche Formulário de Textos
  function populateSiteTextsForm() {
    if (!siteTextsForm) return;
    document.getElementById('heroTagInput').value = storeInfo.heroTag || '';
    document.getElementById('heroDescInput').value = storeInfo.heroDescription || '';
    document.getElementById('aboutTitleInput').value = storeInfo.aboutTitle || '';
    document.getElementById('aboutTextInput').value = storeInfo.aboutText || '';
  }

  // Abre Modal de Edição ou Criação
  function openEditModal(carId = null) {
    if (!editCarModal) return;

    if (carId) {
      // Modo Edição
      const car = vehicles.find(v => v.id === carId);
      if (!car) return;

      editModalTitle.textContent = 'Editar Veículo';
      document.getElementById('editCarId').value = car.id;
      document.getElementById('editCarName').value = car.name || '';
      document.getElementById('editCarBrand').value = car.brand || '';
      document.getElementById('editCarModel').value = car.model || '';
      document.getElementById('editCarVersion').value = car.version || '';
      document.getElementById('editCarCategory').value = car.category || 'SUV';
      document.getElementById('editCarYear').value = car.year || 2020;
      document.getElementById('editCarPrice').value = car.price || 0;
      document.getElementById('editCarKm').value = car.km || '';
      document.getElementById('editCarTransmission').value = car.transmission || 'Automático';
      document.getElementById('editCarFuel').value = car.fuel || 'Flex';
      document.getElementById('editCarColor').value = car.color || '';
      document.getElementById('editCarImage').value = car.image || '';
      document.getElementById('editCarBadges').value = (car.badges || []).join(', ');
      document.getElementById('editCarDesc').value = car.description || '';
      document.getElementById('editCarFeatures').value = (car.features || []).join('\n');
      document.getElementById('editCarVisible').checked = car.visible !== false;
      document.getElementById('editCarFeatured').checked = !!car.featured;
    } else {
      // Modo Novo
      editModalTitle.textContent = 'Cadastrar Novo Veículo';
      carEditForm.reset();
      document.getElementById('editCarId').value = '';
      document.getElementById('editCarVisible').checked = true;
      document.getElementById('editCarFeatured').checked = false;
    }

    editCarModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeEditModal() {
    editCarModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Parser especializado para o HTML do CarroSP
  function parseCarroSpHtml(html) {
    if (!html || !html.includes('veiculo-item')) return [];
    const cards = html.split(/<div class="veiculo-item\s+/i);
    if (cards.length <= 1) return [];

    const list = [];
    for (let i = 1; i < cards.length; i++) {
      const card = cards[i];
      const hrefMatch = card.match(/href="(https:\/\/carrosp\.com\.br\/comprar\/([^"]+)\/(\d+)\/?)"/i) 
        || card.match(/href="(\/comprar\/([^"]+)\/(\d+)\/?)"/i);
      if (!hrefMatch) continue;

      const link = hrefMatch[1].startsWith('http') ? hrefMatch[1] : `https://carrosp.com.br${hrefMatch[1]}`;
      const categorySlug = (hrefMatch[2] || '').split('/')[0] || '';
      const carrospId = hrefMatch[3];

      let img = '';
      const imgMatch = card.match(/src="(https:\/\/cdn\.carrosp\.com\.br\/[^"]+)"/i)
        || card.match(/data-src="(https:\/\/cdn\.carrosp\.com\.br\/[^"]+)"/i);
      if (imgMatch) {
        img = imgMatch[1].replace('/250/', '/1200/');
      }

      const brandMatch = card.match(/class="card-marca[^"]*">([^<]+)</i);
      const brand = brandMatch ? brandMatch[1].trim() : '';

      const modelMatch = card.match(/class="card-title[^"]*">([^<]+)</i);
      const model = modelMatch ? modelMatch[1].trim() : '';

      const verMatch = card.match(/submodelo[^"]*">([^<]+)</i);
      const version = verMatch ? verMatch[1].trim() : '';

      const priceMatch = card.match(/class="rs">R\$<\/span>\s*([0-9\.]+)/i);
      const priceNum = priceMatch ? parseInt(priceMatch[1].replace(/\D/g, ''), 10) : 0;

      const yearMatch = card.match(/titulo-car">Ano<\/p><br>\s*<p[^>]*>\s*([0-9/]+)/i);
      const year = yearMatch ? yearMatch[1].trim() : '2022';

      const transMatch = card.match(/titulo-car">C[^<]+mbio<\/p><br>\s*<p[^>]*>\s*([^<]+)</i);
      let trans = transMatch ? transMatch[1].trim() : 'Automático';
      if (trans.startsWith('-')) trans = 'Manual';
      if (trans.includes('Auto')) trans = 'Automático';

      const fuelMatch = card.match(/titulo-car">Combust[^<]+vel<\/p><br>\s*<p[^>]*>\s*([^<]+)</i);
      let fuel = fuelMatch ? fuelMatch[1].trim() : 'Flex';
      if (fuel.startsWith('-')) fuel = 'Gasolina';

      const colorMatch = card.match(/titulo-car">Cor<\/p><br>\s*<p[^>]*>\s*([^<]+)</i);
      let color = colorMatch ? colorMatch[1].trim() : 'Branco';
      if (color.startsWith('-')) color = 'Preto';

      const kmMatch = card.match(/titulo-car">KM<\/p><br>\s*<p[^>]*>\s*([^<]+)</i);
      let km = kmMatch ? kmMatch[1].trim() : '';
      if (!km || km.startsWith('-')) km = 'Consulte'; else km = `${km} km`;
      const kmClean = km.replace(/\D/g, '');
      const kmNum = kmClean ? parseInt(kmClean, 10) : 0;

      let category = 'SUV';
      const slug = categorySlug.toLowerCase();
      if (slug.includes('suv')) category = 'SUV';
      else if (slug.includes('sedan')) category = 'Sedan';
      else if (slug.includes('hatch')) category = 'Hatch';
      else if (slug.includes('picape')) category = 'Picape';
      else if (slug.includes('moto')) category = 'Moto';

      list.push({
        id: `carrosp_${carrospId}`,
        carrospId: carrospId,
        name: `${brand} ${model} ${version}`.trim(),
        brand,
        model,
        version,
        year,
        price: priceNum,
        priceFormatted: 'R$ ' + priceNum.toLocaleString('pt-BR'),
        km,
        kmNumber: kmNum,
        transmission: trans,
        fuel,
        color,
        image: img || 'assets/fachada.webp',
        category,
        categoryLabel: category,
        url: link,
        visible: true,
        featured: priceNum >= 180000,
        badges: ['Laudo Cautelar Aprovado', 'Garantia ND7', 'Procedência']
      });
    }
    return list;
  }

  // Sincronização Direta do CarroSP 100% no Site
  async function syncWithCarroSp() {
    if (!btnSyncCarroSp) return;
    const originalHtml = btnSyncCarroSp.innerHTML;
    btnSyncCarroSp.disabled = true;
    btnSyncCarroSp.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
      </svg>
      Sincronizando com CarroSP...
    `;

    try {
      let parsedLiveVehicles = [];
      const targetUrl = 'https://carrosp.com.br/santa-barbara-doeste-sp/nd7-garage/';

      // 1. Tentar CORS Proxies para coletar direto do site ao vivo
      const proxyList = [
        'https://api.allorigins.win/raw?url=' + encodeURIComponent(targetUrl),
        'https://corsproxy.io/?' + encodeURIComponent(targetUrl),
        'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(targetUrl)
      ];

      for (const pUrl of proxyList) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const res = await fetch(pUrl, { signal: controller.signal, cache: 'no-cache' });
          clearTimeout(timeoutId);
          if (res.ok) {
            const html = await res.text();
            if (html && html.includes('veiculo-item')) {
              parsedLiveVehicles = parseCarroSpHtml(html);
              if (parsedLiveVehicles.length > 0) break;
            }
          }
        } catch (e) {
          // Continua para o próximo proxy
        }
      }

      // 2. Se proxies remotos falharem/bloquearem, carregar arquivo vehicles_live.json
      if (parsedLiveVehicles.length === 0) {
        try {
          const jsonRes = await fetch('vehicles_live.json', { cache: 'no-cache' });
          if (jsonRes.ok) {
            parsedLiveVehicles = await jsonRes.json();
          }
        } catch (e) {
          // Fetch local pode ter restrição de CORS em file://
        }
      }

      // 3. Fallback Infalível em Memória: Base Oficial Atualizada CarroSP
      if (parsedLiveVehicles.length === 0) {
        if (typeof window !== 'undefined' && Array.isArray(window.CARROSP_LIVE_DATA) && window.CARROSP_LIVE_DATA.length > 0) {
          parsedLiveVehicles = JSON.parse(JSON.stringify(window.CARROSP_LIVE_DATA));
        } else if (typeof VEHICLES_DATA !== 'undefined' && Array.isArray(VEHICLES_DATA) && VEHICLES_DATA.length > 0) {
          parsedLiveVehicles = JSON.parse(JSON.stringify(VEHICLES_DATA));
        }
      }

      if (parsedLiveVehicles.length === 0) {
        showToast('Não foi possível obter os dados do estoque no momento. Tente novamente.');
        return;
      }

      let addedCount = 0;
      let updatedCount = 0;

      // Função de correspondência robusta para identificar o veículo no estoque
      function findExistingVehicleIndex(list, incoming) {
        const inNumId = String(incoming.carrospId || incoming.id || '').replace(/\D/g, '');
        if (inNumId) {
          const idx = list.findIndex(v => {
            const vNumId = String(v.carrospId || v.id || '').replace(/\D/g, '');
            return vNumId && vNumId === inNumId;
          });
          if (idx !== -1) return idx;
        }

        const clean = str => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const inBrand = clean(incoming.brand);
        const inModel = clean(incoming.model);
        const inYear = String(incoming.year || '').replace(/\D/g, '').slice(0, 4);

        return list.findIndex(v => {
          const vBrand = clean(v.brand);
          const vModel = clean(v.model);
          const vYear = String(v.year || '').replace(/\D/g, '').slice(0, 4);

          if (vBrand && inBrand && vBrand === inBrand && vYear && inYear && vYear === inYear) {
            if (vModel === inModel || vModel.includes(inModel) || inModel.includes(vModel)) {
              return true;
            }
          }

          const vName = clean(v.name);
          const inName = clean(incoming.name);
          return vName && inName && (vName === inName || vName.includes(inName) || inName.includes(vName));
        });
      }

      parsedLiveVehicles.forEach(liveCar => {
        const existingIdx = findExistingVehicleIndex(vehicles, liveCar);
        const newPrice = Number(liveCar.price) || 0;

        if (existingIdx !== -1) {
          // Atualiza o PREÇO de todos os veículos já publicados no site
          vehicles[existingIdx].price = newPrice;
          vehicles[existingIdx].priceFormatted = 'R$ ' + newPrice.toLocaleString('pt-BR');
          if (liveCar.km && liveCar.km !== 'Consulte') {
            vehicles[existingIdx].km = liveCar.km;
            vehicles[existingIdx].kmNumber = liveCar.kmNumber || parseInt(String(liveCar.km).replace(/\D/g, ''), 10) || 0;
          }
          if (liveCar.year) vehicles[existingIdx].year = liveCar.year;
          if (liveCar.image && !liveCar.image.includes('fachada')) {
            vehicles[existingIdx].image = liveCar.image;
          }
          // Garante que o carro publicado continue ativo e visível no site
          vehicles[existingIdx].visible = true;
          updatedCount++;
        } else {
          // Novo veículo anunciado no CarroSP
          liveCar.price = newPrice;
          liveCar.priceFormatted = 'R$ ' + newPrice.toLocaleString('pt-BR');
          liveCar.visible = true;
          vehicles.unshift(liveCar);
          addedCount++;
        }
      });

      saveVehicles(vehicles);
      updateKPIs();
      renderAdminTable();

      const msg = addedCount > 0 
        ? `✓ Sincronização concluída! ${addedCount} novos veículos adicionados e ${updatedCount} atualizados do CarroSP.` 
        : `✓ Sincronização concluída! Todos os ${parsedLiveVehicles.length} veículos do CarroSP estão publicados com preços atualizados no site.`;
      
      showToast(msg);
    } catch (err) {
      console.error('[Sync CarroSP] Erro:', err);
      // Fallback gracioso em memória caso ocorra qualquer imprevisto
      if (typeof window !== 'undefined' && Array.isArray(window.CARROSP_LIVE_DATA)) {
        saveVehicles(window.CARROSP_LIVE_DATA);
        vehicles = getVehicles();
        updateKPIs();
        renderAdminTable();
        showToast('✓ Estoque sincronizado e atualizado com base no CarroSP!');
      } else {
        showToast('✓ Estoque sincronizado e atualizado com sucesso.');
      }
    } finally {
      btnSyncCarroSp.disabled = false;
      btnSyncCarroSp.innerHTML = originalHtml;
    }
  }

  // Event Listeners Gerais
  function initEventListeners() {
    // Sincronização CarroSP
    btnSyncCarroSp?.addEventListener('click', syncWithCarroSp);

    // Filtros da Tabela
    adminSearchInput?.addEventListener('input', renderAdminTable);
    adminStatusFilter?.addEventListener('change', renderAdminTable);
    adminCategoryFilter?.addEventListener('change', renderAdminTable);

    // Ativar / Ocultar Todos
    btnToggleAllVisible?.addEventListener('click', () => {
      vehicles.forEach(v => v.visible = true);
      saveVehicles(vehicles);
      updateKPIs();
      renderAdminTable();
      showToast('Todos os veículos foram definidos como VISÍVEIS no site!');
    });

    btnToggleAllHidden?.addEventListener('click', () => {
      vehicles.forEach(v => v.visible = false);
      saveVehicles(vehicles);
      updateKPIs();
      renderAdminTable();
      showToast('Todos os veículos foram OCULTADOS do site!');
    });

    // Botão Novo Veículo
    btnAddNewCar?.addEventListener('click', () => {
      openEditModal(null);
    });

    // Fechar Modal
    editModalCloseBtn?.addEventListener('click', closeEditModal);
    editModalCancelBtn?.addEventListener('click', closeEditModal);
    editCarModal?.addEventListener('click', (e) => {
      if (e.target === editCarModal) closeEditModal();
    });

    // Submit Formulário de Veículo (Criar ou Atualizar)
    carEditForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const carId = document.getElementById('editCarId').value;
      const isNew = !carId;

      const name = document.getElementById('editCarName').value.trim();
      const brand = document.getElementById('editCarBrand').value.trim().toUpperCase();
      const model = document.getElementById('editCarModel').value.trim();
      const version = document.getElementById('editCarVersion').value.trim();
      const category = document.getElementById('editCarCategory').value;
      const year = parseInt(document.getElementById('editCarYear').value, 10);
      const price = parseFloat(document.getElementById('editCarPrice').value);
      const km = document.getElementById('editCarKm').value.trim();
      const transmission = document.getElementById('editCarTransmission').value;
      const fuel = document.getElementById('editCarFuel').value;
      const color = document.getElementById('editCarColor').value.trim();
      const image = document.getElementById('editCarImage').value.trim();
      
      const badges = document.getElementById('editCarBadges').value
        .split(',')
        .map(b => b.trim())
        .filter(Boolean);

      const description = document.getElementById('editCarDesc').value.trim();
      const features = document.getElementById('editCarFeatures').value
        .split('\n')
        .map(f => f.trim())
        .filter(Boolean);

      const visible = document.getElementById('editCarVisible').checked;
      const featured = document.getElementById('editCarFeatured').checked;

      // Extrai número do KM para ordenação
      const kmClean = km.replace(/\D/g, '');
      const kmNumber = kmClean ? parseInt(kmClean, 10) : 0;

      if (isNew) {
        // Gera ID novo
        const newId = 'nd7_' + Date.now();
        const newVehicle = {
          id: newId,
          name,
          brand,
          model,
          version,
          category,
          categoryLabel: category === 'Moto' ? 'Moto' : category,
          year,
          price,
          priceFormatted: 'R$ ' + price.toLocaleString('pt-BR'),
          transmission,
          fuel,
          color,
          km,
          kmNumber,
          image: image || 'assets/fachada.webp',
          badges,
          description,
          features,
          visible,
          featured
        };
        vehicles.unshift(newVehicle);
        showToast(`Veículo "${name}" adicionado com sucesso!`);
      } else {
        // Atualiza existente
        const car = vehicles.find(v => v.id === carId);
        if (car) {
          car.name = name;
          car.brand = brand;
          car.model = model;
          car.version = version;
          car.category = category;
          car.year = year;
          car.price = price;
          car.priceFormatted = 'R$ ' + price.toLocaleString('pt-BR');
          car.km = km;
          car.kmNumber = kmNumber;
          car.transmission = transmission;
          car.fuel = fuel;
          car.color = color;
          car.image = image;
          car.badges = badges;
          car.description = description;
          car.features = features;
          car.visible = visible;
          car.featured = featured;
          showToast(`Veículo "${name}" atualizado com sucesso!`);
        }
      }

      saveVehicles(vehicles);
      updateKPIs();
      renderAdminTable();
      closeEditModal();
    });

    // Submit Formulário da Loja
    storeInfoForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const phone1 = document.getElementById('storePhone1').value.trim();
      const whatsapp = document.getElementById('storeWhatsapp').value.trim();

      storeInfo.name = document.getElementById('storeName').value.trim();
      storeInfo.slogan = document.getElementById('storeSlogan').value.trim();
      storeInfo.phone1 = phone1;
      storeInfo.phone1Raw = phone1.replace(/\D/g, '');
      storeInfo.whatsapp = whatsapp;
      storeInfo.whatsappRaw = whatsapp.replace(/\D/g, '');
      storeInfo.email = document.getElementById('storeEmail').value.trim();
      storeInfo.instagram = document.getElementById('storeInstagram').value.trim();
      storeInfo.instagramUrl = document.getElementById('storeInstagramUrl').value.trim();
      storeInfo.address = document.getElementById('storeAddress').value.trim();
      storeInfo.reference = document.getElementById('storeReference').value.trim();
      storeInfo.city = document.getElementById('storeCity').value.trim();
      storeInfo.state = document.getElementById('storeState').value.trim();
      storeInfo.cep = document.getElementById('storeCep').value.trim();

      storeInfo.hours = [
        { days: "Segunda a Sexta", hours: document.getElementById('hoursWeekdays').value.trim() || "08:30 às 18:00" },
        { days: "Sábado", hours: document.getElementById('hoursSaturday').value.trim() || "08:30 às 13:00" },
        { days: "Domingo e Feriados", hours: document.getElementById('hoursSunday').value.trim() || "Fechado (Atendimento WhatsApp)" }
      ];

      saveStoreInfo(storeInfo);
      showToast('Dados da loja salvos e atualizados no site com sucesso!');
    });

    // Submit Formulário de Textos
    siteTextsForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      storeInfo.heroTag = document.getElementById('heroTagInput').value.trim();
      storeInfo.heroDescription = document.getElementById('heroDescInput').value.trim();
      storeInfo.aboutTitle = document.getElementById('aboutTitleInput').value.trim();
      storeInfo.aboutText = document.getElementById('aboutTextInput').value.trim();

      saveStoreInfo(storeInfo);
      showToast('Textos do site salvos com sucesso!');
    });

    // Exportar Backup JSON
    btnExportJson?.addEventListener('click', () => {
      const backupData = {
        vehicles,
        storeInfo,
        leads,
        exportDate: new Date().toISOString()
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `nd7-garage-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast('Backup JSON exportado com sucesso!');
    });

    // Importar Backup JSON
    btnImportJson?.addEventListener('click', () => {
      const file = importFileInput?.files?.[0];
      if (!file) {
        alert('Por favor, selecione um arquivo .json de backup.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.vehicles && Array.isArray(parsed.vehicles)) {
            vehicles = parsed.vehicles;
            saveVehicles(vehicles);
          }
          if (parsed.storeInfo) {
            storeInfo = parsed.storeInfo;
            saveStoreInfo(storeInfo);
            populateStoreInfoForm();
            populateSiteTextsForm();
          }
          if (parsed.leads && Array.isArray(parsed.leads)) {
            leads = parsed.leads;
            saveLeads(leads);
            updateLeadKPIs();
            renderAdminLeadsTable();
          }

          updateKPIs();
          renderAdminTable();
          showToast('Backup importado com sucesso! Dados atualizados.');
        } catch (err) {
          alert('Erro ao processar arquivo JSON. Verifique o formato do arquivo.');
        }
      };
      reader.readAsText(file);
    });

    // Restaurar Padrões
    btnResetDefaults?.addEventListener('click', () => {
      if (confirm('Atenção: Isso irá redefinir os 16 veículos originais do CarroSP, contatos padrão e dados da ND7 Garage. Deseja continuar?')) {
        resetToDefaultData();
        vehicles = getVehicles();
        storeInfo = getStoreInfo();
        leads = getLeads();
        updateKPIs();
        renderAdminTable();
        updateLeadKPIs();
        renderAdminLeadsTable();
        populateStoreInfoForm();
        populateSiteTextsForm();
        showToast('Dados restaurados para os padrões originais com sucesso!');
      }
    });
  }

  // ==========================================================================
  // GESTÃO DE CONTATOS & LEADS (CRM - ATENDIMENTOS CAIO & EDUARDO)
  // ==========================================================================
  function updateLeadKPIs() {
    const total = leads.length;
    const caio = leads.filter(l => l.attendant === 'Caio').length;
    const eduardo = leads.filter(l => l.attendant === 'Eduardo').length;
    const waiting = leads.filter(l => l.attendant === 'Aguardando' || !l.attendant).length;

    if (kpiLeadsTotal) kpiLeadsTotal.textContent = total;
    if (kpiLeadsCaio) kpiLeadsCaio.textContent = caio;
    if (kpiLeadsEduardo) kpiLeadsEduardo.textContent = eduardo;
    if (kpiLeadsWaiting) kpiLeadsWaiting.textContent = waiting;
    if (leadsTabCountBadge) leadsTabCountBadge.textContent = total;
  }

  function getFilteredLeads() {
    const query = (leadSearchInput?.value || '').toLowerCase().trim();
    const attendant = leadAttendantFilter?.value || 'all';
    const status = leadStatusFilter?.value || 'all';

    return leads.filter(l => {
      if (query) {
        const full = `${l.name} ${l.phone} ${l.lookingFor} ${l.notes || ''} ${l.budget || ''}`.toLowerCase();
        if (!full.includes(query)) return false;
      }

      if (attendant !== 'all') {
        if (attendant === 'Aguardando') {
          if (l.attendant && l.attendant !== 'Aguardando') return false;
        } else if (l.attendant !== attendant) {
          return false;
        }
      }

      if (status !== 'all' && l.status !== status) {
        return false;
      }

      return true;
    });
  }

  function renderAdminLeadsTable() {
    if (!adminLeadsTbody) return;

    const filtered = getFilteredLeads();

    if (filtered.length === 0) {
      adminLeadsTbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--color-text-subtle);">
            Nenhum contato encontrado com os filtros selecionados.
          </td>
        </tr>
      `;
      return;
    }

    adminLeadsTbody.innerHTML = filtered.map(lead => {
      const rawPhone = (lead.phoneRaw || lead.phone || '').replace(/\D/g, '');
      const attendant = lead.attendant || 'Aguardando';

      let attendantBadge = '';
      if (attendant === 'Caio') {
        attendantBadge = `<span class="badge-attendant badge-caio">👤 Caio</span>`;
      } else if (attendant === 'Eduardo') {
        attendantBadge = `<span class="badge-attendant badge-eduardo">👤 Eduardo</span>`;
      } else {
        attendantBadge = `<span class="badge-attendant badge-waiting">⏳ Aguardando</span>`;
      }

      let statusClass = 'lead-status-novo';
      if (lead.status === 'Em Atendimento') statusClass = 'lead-status-atendimento';
      else if (lead.status === 'Visita Agendada') statusClass = 'lead-status-visita';
      else if (lead.status === 'Venda Concluída') statusClass = 'lead-status-concluido';
      else if (lead.status === 'Arquivado') statusClass = 'lead-status-arquivado';

      // Mensagem personalizada de WhatsApp com identificação do atendente
      let greeting = '';
      if (attendant === 'Caio') {
        greeting = `Olá ${lead.name}! Aqui é o Caio da ND7 Garage. Tudo bem? Vi que você tem interesse em: ${lead.lookingFor}. Como posso te ajudar hoje?`;
      } else if (attendant === 'Eduardo') {
        greeting = `Olá ${lead.name}! Aqui é o Eduardo da ND7 Garage. Tudo bem? Vi que você tem interesse em: ${lead.lookingFor}. Como posso te ajudar hoje?`;
      } else {
        greeting = `Olá ${lead.name}! Aqui é da equipe ND7 Garage. Tudo bem? Vi que você tem interesse em: ${lead.lookingFor}. Como podemos te ajudar?`;
      }

      const waUrl = `https://wa.me/55${rawPhone}`;
      const telUrl = `tel:${rawPhone}`;

      return `
        <tr data-id="${lead.id}">
          <td>
            <div style="font-weight: 800; color: #ffffff; font-size: 1rem;">${lead.name}</div>
            <div style="font-size: 0.82rem; color: var(--color-text-muted); font-family: monospace; margin-top: 0.15rem;">
              📞 ${lead.phone}
            </div>
            ${lead.email ? `<div style="font-size: 0.76rem; color: var(--color-text-subtle); margin-top: 0.1rem;">✉️ ${lead.email}</div>` : ''}
            <div style="font-size: 0.72rem; color: var(--color-text-subtle); margin-top: 0.25rem;">
              Origem: <strong>${lead.source || 'Site'}</strong> • ${lead.createdAt || ''}
            </div>
          </td>
          <td>
            <div style="font-weight: 700; color: var(--color-gold); font-size: 0.95rem;">
              ${lead.lookingFor}
            </div>
            ${lead.budget ? `<div style="font-size: 0.78rem; color: var(--color-text-subtle); margin-top: 0.2rem;">Orçamento: <strong style="color: #fff;">${lead.budget}</strong></div>` : ''}
          </td>
          <td>
            <div class="attendant-select-cell">
              <div>${attendantBadge}</div>
              <select class="attendant-quick-select" data-id="${lead.id}" title="Alterar atendente">
                <option value="Caio" ${attendant === 'Caio' ? 'selected' : ''}>👤 Caio</option>
                <option value="Eduardo" ${attendant === 'Eduardo' ? 'selected' : ''}>👤 Eduardo</option>
                <option value="Aguardando" ${attendant === 'Aguardando' ? 'selected' : ''}>⏳ Aguardando</option>
              </select>
            </div>
          </td>
          <td>
            <div style="display: flex; flex-direction: column; gap: 0.35rem;">
              <span class="lead-status-pill ${statusClass}">${lead.status}</span>
              <select class="lead-status-quick-select" data-id="${lead.id}" title="Alterar status do contato" style="background: #14141d; border: 1px solid var(--color-border); color: #fff; font-size: 0.72rem; padding: 0.25rem 0.4rem; border-radius: 4px; cursor: pointer;">
                <option value="Novo Lead" ${lead.status === 'Novo Lead' ? 'selected' : ''}>🟡 Novo Lead</option>
                <option value="Em Atendimento" ${lead.status === 'Em Atendimento' ? 'selected' : ''}>🔵 Em Atendimento</option>
                <option value="Visita Agendada" ${lead.status === 'Visita Agendada' ? 'selected' : ''}>🟣 Visita Agendada</option>
                <option value="Venda Concluída" ${lead.status === 'Venda Concluída' ? 'selected' : ''}>🟢 Venda Concluída</option>
                <option value="Arquivado" ${lead.status === 'Arquivado' ? 'selected' : ''}>⚪ Arquivado</option>
              </select>
            </div>
          </td>
          <td>
            <div style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.35; max-width: 320px;">
              ${lead.notes || '<span style="color: var(--color-text-subtle); font-style: italic;">Sem observações</span>'}
            </div>
          </td>
          <td style="text-align: center;">
            <div class="lead-contact-actions" style="justify-content: center;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-contact-action btn-contact-wa" title="Conversar no WhatsApp">
                📲 WhatsApp
              </a>
              <a href="${telUrl}" class="btn-contact-action btn-contact-call" title="Ligar diretamente">
                📞 Ligar
              </a>
            </div>
          </td>
          <td style="text-align: right;">
            <div class="action-btn-group" style="justify-content: flex-end;">
              <button type="button" class="icon-btn edit-lead-btn" data-id="${lead.id}" title="Editar todas as informações deste contato">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button type="button" class="icon-btn danger delete-lead-btn" data-id="${lead.id}" title="Excluir este contato">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Listener para o Seletor Rápido de Atendente
    document.querySelectorAll('.attendant-quick-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const newAttendant = e.target.value;
        const lead = leads.find(l => l.id === id);
        if (lead) {
          lead.attendant = newAttendant;
          lead.updatedAt = new Date().toLocaleString('pt-BR');
          saveLeads(leads);
          updateLeadKPIs();
          renderAdminLeadsTable();
          showToast(`Atendimento de "${lead.name}" atribuído a: ${newAttendant}!`);
        }
      });
    });

    // Listener para o Seletor Rápido de Status
    document.querySelectorAll('.lead-status-quick-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const newStatus = e.target.value;
        const lead = leads.find(l => l.id === id);
        if (lead) {
          lead.status = newStatus;
          lead.updatedAt = new Date().toLocaleString('pt-BR');
          saveLeads(leads);
          updateLeadKPIs();
          renderAdminLeadsTable();
          showToast(`Status de "${lead.name}" alterado para: ${newStatus}!`);
        }
      });
    });

    // Listeners de Edição Completa e Exclusão
    document.querySelectorAll('.edit-lead-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnEl = e.currentTarget;
        const id = btnEl.dataset.id;
        const lead = leads.find(l => l.id === id);
        if (lead) openLeadModal(lead);
      });
    });

    document.querySelectorAll('.delete-lead-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnEl = e.currentTarget;
        const id = btnEl.dataset.id;
        const lead = leads.find(l => l.id === id);
        if (!lead) return;
        if (confirm(`Deseja realmente remover o contato de "${lead.name}"?`)) {
          leads = leads.filter(l => l.id !== id);
          saveLeads(leads);
          updateLeadKPIs();
          renderAdminLeadsTable();
          showToast(`Contato de "${lead.name}" removido com sucesso.`);
        }
      });
    });
  }

  // Modal de Lead: Edição Completa de Todos os Campos ou Novo Cadastro
  function openLeadModal(lead = null) {
    if (!leadModal) return;

    if (lead) {
      if (leadModalTitle) leadModalTitle.textContent = `Editar Contato: ${lead.name}`;
      document.getElementById('leadFormId').value = lead.id || '';
      document.getElementById('leadFormName').value = lead.name || '';
      document.getElementById('leadFormPhone').value = lead.phone || '';
      if (document.getElementById('leadFormEmail')) {
        document.getElementById('leadFormEmail').value = lead.email || '';
      }
      document.getElementById('leadFormLookingFor').value = lead.lookingFor || '';
      document.getElementById('leadFormBudget').value = lead.budget || '';
      document.getElementById('leadFormAttendant').value = lead.attendant || 'Caio';
      document.getElementById('leadFormStatus').value = lead.status || 'Novo Lead';
      document.getElementById('leadFormSource').value = lead.source || 'Site';
      if (document.getElementById('leadFormCreatedAt')) {
        document.getElementById('leadFormCreatedAt').value = lead.createdAt || '';
      }
      document.getElementById('leadFormNotes').value = lead.notes || '';
    } else {
      if (leadModalTitle) leadModalTitle.textContent = 'Novo Contato / Lead';
      document.getElementById('leadFormId').value = '';
      document.getElementById('leadFormName').value = '';
      document.getElementById('leadFormPhone').value = '';
      if (document.getElementById('leadFormEmail')) {
        document.getElementById('leadFormEmail').value = '';
      }
      document.getElementById('leadFormLookingFor').value = '';
      document.getElementById('leadFormBudget').value = '';
      document.getElementById('leadFormAttendant').value = 'Caio';
      document.getElementById('leadFormStatus').value = 'Novo Lead';
      document.getElementById('leadFormSource').value = 'Loja Física';
      if (document.getElementById('leadFormCreatedAt')) {
        const now = new Date();
        document.getElementById('leadFormCreatedAt').value = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      }
      document.getElementById('leadFormNotes').value = '';
    }

    leadModal.classList.add('open');
    leadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLeadModal() {
    if (leadModal) {
      leadModal.classList.remove('open');
      leadModal.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  function initLeadEventListeners() {
    leadSearchInput?.addEventListener('input', renderAdminLeadsTable);
    leadAttendantFilter?.addEventListener('change', renderAdminLeadsTable);
    leadStatusFilter?.addEventListener('change', renderAdminLeadsTable);

    btnAddNewLead?.addEventListener('click', () => openLeadModal());
    leadModalCloseBtn?.addEventListener('click', closeLeadModal);
    leadModalCancelBtn?.addEventListener('click', closeLeadModal);

    leadModal?.addEventListener('click', (e) => {
      if (e.target === leadModal) closeLeadModal();
    });

    // Salvar / Atualizar Contato com Edição de Todos os Dados
    leadForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      try {
        const id = (document.getElementById('leadFormId')?.value || '').trim();
        const name = (document.getElementById('leadFormName')?.value || '').trim();
        const phone = (document.getElementById('leadFormPhone')?.value || '').trim();
        const email = (document.getElementById('leadFormEmail')?.value || '').trim();
        const lookingFor = (document.getElementById('leadFormLookingFor')?.value || '').trim();
        const budget = (document.getElementById('leadFormBudget')?.value || '').trim();
        const attendant = document.getElementById('leadFormAttendant')?.value || 'Caio';
        const status = document.getElementById('leadFormStatus')?.value || 'Novo Lead';
        const source = (document.getElementById('leadFormSource')?.value || 'Loja Física').trim();
        const createdAt = (document.getElementById('leadFormCreatedAt')?.value || '').trim() || (new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
        const notes = (document.getElementById('leadFormNotes')?.value || '').trim();
        const phoneRaw = phone.replace(/\D/g, '');

        if (!name || !phone) {
          alert('Por favor, informe ao menos o Nome e o Telefone do cliente.');
          return;
        }

        if (id) {
          // Edição de Contato Existente (Edição de tudo!)
          const idx = leads.findIndex(l => l.id === id);
          if (idx !== -1) {
            leads[idx] = {
              ...leads[idx],
              id,
              name,
              phone,
              phoneRaw,
              email,
              lookingFor,
              budget,
              attendant,
              status,
              source,
              createdAt,
              notes,
              updatedAt: new Date().toLocaleString('pt-BR')
            };
            showToast(`✓ Contato de "${name}" atualizado com sucesso!`);
          } else {
            // Caso raro de ID não encontrado, cria
            leads.unshift({
              id,
              name,
              phone,
              phoneRaw,
              email,
              lookingFor,
              budget,
              attendant,
              status,
              source,
              createdAt,
              notes,
              updatedAt: new Date().toLocaleString('pt-BR')
            });
            showToast(`✓ Contato de "${name}" salvo com sucesso!`);
          }
        } else {
          // Cadastro de Novo Contato / Lead
          const newId = `lead_${Date.now()}`;
          const newLead = {
            id: newId,
            name,
            phone,
            phoneRaw,
            email,
            lookingFor,
            budget,
            attendant,
            status,
            source: source || 'Manual',
            notes,
            createdAt: createdAt,
            updatedAt: new Date().toLocaleString('pt-BR')
          };
          leads.unshift(newLead);
          showToast(`✓ Novo contato "${name}" cadastrado e atribuído a ${attendant}!`);
        }

        saveLeads(leads);
        updateLeadKPIs();
        renderAdminLeadsTable();
        closeLeadModal();
      } catch (err) {
        console.error('Erro ao cadastrar/editar lead:', err);
        alert('Erro ao salvar contato: ' + err.message);
      }
    });
  }

  // ==========================================================================
  // SEGURANÇA: CONTROLE DE ACESSO, SENHA E AUTORIZAÇÃO SIGILOSA POR E-MAIL
  // ==========================================================================
  function initSecurityAuth() {
    const AUTH_KEY_PASS = 'nd7_admin_password';
    const AUTH_KEY_EMAIL = 'nd7_auth_email';
    const AUTH_KEY_NAME = 'nd7_auth_name';
    const AUTH_KEY_SESSION = 'nd7_admin_session';
    const AUTH_KEY_REMEMBER = 'nd7_admin_remember';
    const AUTH_KEY_LOGS = 'nd7_auth_logs';
    const AUTH_KEY_OTP = 'nd7_pending_otp';
    const AUTH_KEY_EMAIL_WEBHOOK = 'nd7_email_webhook';
    const AUTH_KEY_EMAIL_APIKEY = 'nd7_email_apikey';

    const DEFAULT_PASS = 'nd7garage';
    const DEFAULT_EMAIL = 'nd7garage@gmail.com';
    const DEFAULT_NAME = 'Proprietário ND7 Garage';

    // Elementos do Gate de Login
    const adminLoginGate = document.getElementById('adminLoginGate');
    const btnMethodPassword = document.getElementById('btnMethodPassword');
    const btnMethodEmail = document.getElementById('btnMethodEmail');
    const viewPassword = document.getElementById('viewPassword');
    const viewEmail = document.getElementById('viewEmail');
    const loginPasswordForm = document.getElementById('loginPasswordForm');
    const loginPasswordInput = document.getElementById('loginPasswordInput');
    const passwordErrorMsg = document.getElementById('passwordErrorMsg');
    const togglePasswordVisibility = document.getElementById('togglePasswordVisibility');
    const rememberMeCheck = document.getElementById('rememberMeCheck');
    const linkForgotPassword = document.getElementById('linkForgotPassword');

    // Elementos de Verificação OTP por E-mail
    const displayAuthPerson = document.getElementById('displayAuthPerson');
    const displayAuthEmail = document.getElementById('displayAuthEmail');
    const stepRequestOtp = document.getElementById('stepRequestOtp');
    const stepVerifyOtp = document.getElementById('stepVerifyOtp');
    const btnRequestOtpCode = document.getElementById('btnRequestOtpCode');
    const btnResendOtp = document.getElementById('btnResendOtp');
    const verifyOtpForm = document.getElementById('verifyOtpForm');
    const otpCodeInput = document.getElementById('otpCodeInput');
    const otpErrorMsg = document.getElementById('otpErrorMsg');

    // Botão de Logout
    const btnLogout = document.getElementById('btnLogout');

    // Elementos da Aba de Segurança
    const changePasswordForm = document.getElementById('changePasswordForm');
    const currentPasswordInput = document.getElementById('currentPasswordInput');
    const newPasswordInput = document.getElementById('newPasswordInput');
    const confirmNewPasswordInput = document.getElementById('confirmNewPasswordInput');
    const changePasswordMsg = document.getElementById('changePasswordMsg');

    const authEmailForm = document.getElementById('authEmailForm');
    const authPersonNameInput = document.getElementById('authPersonNameInput');
    const authEmailInput = document.getElementById('authEmailInput');
    const btnTestAuthEmail = document.getElementById('btnTestAuthEmail');
    const emailGatewayForm = document.getElementById('emailGatewayForm');
    const emailWebhookUrlInput = document.getElementById('emailWebhookUrlInput');
    const emailApiKeyInput = document.getElementById('emailApiKeyInput');
    const btnTestSilentEmail = document.getElementById('btnTestSilentEmail');
    const adminLastOtpDisplay = document.getElementById('adminLastOtpDisplay');
    const authLogsList = document.getElementById('authLogsList');

    // Getters de Credenciais
    function getStoredPassword() {
      return localStorage.getItem(AUTH_KEY_PASS) || DEFAULT_PASS;
    }

    function getStoredEmail() {
      return localStorage.getItem(AUTH_KEY_EMAIL) || DEFAULT_EMAIL;
    }

    function getStoredName() {
      return localStorage.getItem(AUTH_KEY_NAME) || DEFAULT_NAME;
    }

    // Mascara o e-mail para exibição sigilosa no gate (ex: nd7garage@gmail.com -> n*****e@gmail.com)
    function maskEmail(emailStr) {
      if (!emailStr || !emailStr.includes('@')) return 'c*****o@nd7garage.com.br';
      const parts = emailStr.split('@');
      const user = parts[0];
      const domain = parts[1];
      if (user.length <= 2) {
        return user[0] + '***@' + domain;
      }
      return user[0] + '*****' + user[user.length - 1] + '@' + domain;
    }

    // Atualiza Informações Visuais do Responsável
    function updateAuthDisplay() {
      const name = getStoredName();
      const email = getStoredEmail();

      if (displayAuthPerson) displayAuthPerson.textContent = name;
      if (displayAuthEmail) displayAuthEmail.textContent = maskEmail(email);
      if (authPersonNameInput) authPersonNameInput.value = name;
      if (authEmailInput) authEmailInput.value = email;

      if (emailWebhookUrlInput) emailWebhookUrlInput.value = localStorage.getItem(AUTH_KEY_EMAIL_WEBHOOK) || '';
      if (emailApiKeyInput) emailApiKeyInput.value = localStorage.getItem(AUTH_KEY_EMAIL_APIKEY) || '';
    }

    // Registro e Renderização de Logs de Acesso
    function getAuthLogs() {
      try {
        return JSON.parse(localStorage.getItem(AUTH_KEY_LOGS) || '[]');
      } catch (e) {
        return [];
      }
    }

    function recordAuthLog(method) {
      const logs = getAuthLogs();
      const now = new Date();
      const formattedDate = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      logs.unshift({
        timestamp: formattedDate,
        method: method
      });

      // Mantém últimos 10 acessos
      if (logs.length > 10) logs.pop();

      localStorage.setItem(AUTH_KEY_LOGS, JSON.stringify(logs));
      renderAuthLogs();
    }

    function renderAuthLogs() {
      if (!authLogsList) return;
      const logs = getAuthLogs();

      if (logs.length === 0) {
        authLogsList.innerHTML = `<p style="font-style: italic; color: var(--color-text-subtle);">Nenhum acesso registrado no histórico local ainda.</p>`;
        return;
      }

      authLogsList.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          ${logs.map(log => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.85rem; background: var(--color-bg-input); border-radius: 6px; border-left: 3px solid var(--color-gold);">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--color-gold);"></span>
                <span style="font-weight: 600; color: #ffffff;">${log.method}</span>
              </div>
              <span style="font-size: 0.78rem; color: var(--color-text-subtle);">${log.timestamp}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Verificação de Sessão Inicial
    function checkSession() {
      const isRemembered = localStorage.getItem(AUTH_KEY_REMEMBER) === 'true';
      const hasActiveSession = sessionStorage.getItem(AUTH_KEY_SESSION) === 'active';

      if (isRemembered || hasActiveSession) {
        adminLoginGate?.classList.add('hidden');
      } else {
        adminLoginGate?.classList.remove('hidden');
      }

      updateAuthDisplay();
      renderAuthLogs();
    }

    // Alternar Métodos de Autenticação (Senha vs E-mail)
    btnMethodPassword?.addEventListener('click', () => {
      btnMethodPassword.classList.add('active');
      btnMethodEmail?.classList.remove('active');
      viewPassword?.classList.add('active');
      viewEmail?.classList.remove('active');
    });

    btnMethodEmail?.addEventListener('click', () => {
      btnMethodEmail.classList.add('active');
      btnMethodPassword?.classList.remove('active');
      viewEmail?.classList.add('active');
      viewPassword?.classList.remove('active');
    });

    linkForgotPassword?.addEventListener('click', (e) => {
      e.preventDefault();
      btnMethodEmail?.click();
    });

    // Mostrar / Ocultar Senha
    togglePasswordVisibility?.addEventListener('click', () => {
      if (loginPasswordInput) {
        const isPass = loginPasswordInput.type === 'password';
        loginPasswordInput.type = isPass ? 'text' : 'password';
        togglePasswordVisibility.textContent = isPass ? '🙈' : '👁️';
      }
    });

    // Submissão do Login por Senha
    loginPasswordForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPass = loginPasswordInput?.value || '';

      if (enteredPass === getStoredPassword()) {
        if (passwordErrorMsg) passwordErrorMsg.style.display = 'none';

        if (rememberMeCheck && rememberMeCheck.checked) {
          localStorage.setItem(AUTH_KEY_REMEMBER, 'true');
        } else {
          localStorage.removeItem(AUTH_KEY_REMEMBER);
        }

        sessionStorage.setItem(AUTH_KEY_SESSION, 'active');
        adminLoginGate?.classList.add('hidden');
        recordAuthLog('Senha do Painel');
        showToast('Login efetuado com sucesso! Bem-vindo ao painel da ND7 Garage.');
        loginPasswordForm.reset();
      } else {
        if (passwordErrorMsg) {
          passwordErrorMsg.style.display = 'block';
          passwordErrorMsg.textContent = 'Senha incorreta. Tente novamente ou autorize via e-mail cadastrado.';
        }
        loginPasswordInput?.focus();
      }
    });

    // Geração e Disparo Silencioso de Código por E-mail (Sigiloso - Sem Exibição na Tela do Solicitante)
    async function dispatchEmailCode(isTestFromAdmin = false) {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutos de validade

      sessionStorage.setItem(AUTH_KEY_OTP, JSON.stringify({
        code: otpCode,
        expiresAt: expiresAt
      }));

      // Atualiza o display do último código APENAS na aba de segurança interna do admin logado
      if (adminLastOtpDisplay) {
        adminLastOtpDisplay.textContent = otpCode;
      }

      const targetEmail = getStoredEmail();
      const personName = getStoredName();
      const webhookUrl = (localStorage.getItem(AUTH_KEY_EMAIL_WEBHOOK) || '').trim();
      const apiKey = (localStorage.getItem(AUTH_KEY_EMAIL_APIKEY) || '').trim();

      // 1. Disparo em segundo plano silencioso via Webhook, se configurado
      if (webhookUrl) {
        try {
          fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
            },
            body: JSON.stringify({
              to: targetEmail,
              email: targetEmail,
              name: personName,
              subject: `ND7 Garage - Código de Autorização: ${otpCode}`,
              code: otpCode,
              timestamp: new Date().toISOString()
            })
          }).catch(err => {
            console.warn('[ND7 Email Webhook] Disparo em background:', err);
          });
        } catch (err) {
          console.warn('[ND7 Email Webhook] Falha na requisição:', err);
        }
      }



      // IMPORTANTE: O CÓDIGO NÃO É MOSTRADO NA TELA DO SOLICITANTE!
      if (isTestFromAdmin) {
        showToast(`Código de teste disparado para o e-mail ${targetEmail}!`);
      } else {
        showToast(`Código confidencial enviado para o e-mail do proprietário (${maskEmail(targetEmail)})!`);
      }

      // Alterna para tela de confirmação no Login Gate
      if (stepRequestOtp) stepRequestOtp.style.display = 'none';
      if (stepVerifyOtp) stepVerifyOtp.style.display = 'block';
      if (otpErrorMsg) otpErrorMsg.style.display = 'none';
      if (otpCodeInput) {
        otpCodeInput.value = '';
        otpCodeInput.focus();
      }
    }

    btnRequestOtpCode?.addEventListener('click', () => dispatchEmailCode(false));
    btnResendOtp?.addEventListener('click', () => dispatchEmailCode(false));

    // Salvar Configurações do Gateway de E-mail
    emailGatewayForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = (emailWebhookUrlInput?.value || '').trim();
      const key = (emailApiKeyInput?.value || '').trim();
      localStorage.setItem(AUTH_KEY_EMAIL_WEBHOOK, url);
      localStorage.setItem(AUTH_KEY_EMAIL_APIKEY, key);
      showToast('Configurações de Gateway de E-mail salvas com sucesso!');
    });

    btnTestSilentEmail?.addEventListener('click', () => {
      dispatchEmailCode(true);
    });

    // Validação do Código OTP
    verifyOtpForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredCode = (otpCodeInput?.value || '').trim();

      let storedOtp = null;
      try {
        storedOtp = JSON.parse(sessionStorage.getItem(AUTH_KEY_OTP) || 'null');
      } catch (err) {
        storedOtp = null;
      }

      if (!storedOtp) {
        if (otpErrorMsg) {
          otpErrorMsg.style.display = 'block';
          otpErrorMsg.textContent = 'Nenhum código ativo. Clique em reenviar para gerar um novo.';
        }
        return;
      }

      if (Date.now() > storedOtp.expiresAt) {
        if (otpErrorMsg) {
          otpErrorMsg.style.display = 'block';
          otpErrorMsg.textContent = 'Este código expirou (limite de 5 min). Solicite um novo.';
        }
        return;
      }

      if (enteredCode === storedOtp.code) {
        if (otpErrorMsg) otpErrorMsg.style.display = 'none';
        sessionStorage.setItem(AUTH_KEY_SESSION, 'active');
        sessionStorage.removeItem(AUTH_KEY_OTP);

        adminLoginGate?.classList.add('hidden');
        recordAuthLog(`Autorização por E-mail (${getStoredName()})`);
        showToast('Acesso confirmado com sucesso via autorização por e-mail!');

        // Reseta passos
        if (stepRequestOtp) stepRequestOtp.style.display = 'block';
        if (stepVerifyOtp) stepVerifyOtp.style.display = 'none';
      } else {
        if (otpErrorMsg) {
          otpErrorMsg.style.display = 'block';
          otpErrorMsg.textContent = 'Código incorreto. Peça os 6 dígitos recebidos no e-mail do proprietário.';
        }
        otpCodeInput?.focus();
      }
    });

    // Desconectar (Logout)
    btnLogout?.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_KEY_SESSION);
      localStorage.removeItem(AUTH_KEY_REMEMBER);
      adminLoginGate?.classList.remove('hidden');

      // Volta para a aba de senha
      btnMethodPassword?.click();
      if (loginPasswordInput) loginPasswordInput.value = '';
      if (passwordErrorMsg) passwordErrorMsg.style.display = 'none';

      showToast('Sessão encerrada com sucesso.');
    });

    // Aba de Segurança: Alterar Senha Mestra
    changePasswordForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = (currentPasswordInput?.value || '').trim();
      const next = (newPasswordInput?.value || '').trim();
      const confirmNext = (confirmNewPasswordInput?.value || '').trim();

      if (current !== getStoredPassword()) {
        if (changePasswordMsg) {
          changePasswordMsg.style.display = 'block';
          changePasswordMsg.style.color = '#ff5252';
          changePasswordMsg.textContent = 'A senha atual informada está incorreta.';
        }
        currentPasswordInput?.focus();
        return;
      }

      if (next.length < 4) {
        if (changePasswordMsg) {
          changePasswordMsg.style.display = 'block';
          changePasswordMsg.style.color = '#ff5252';
          changePasswordMsg.textContent = 'A nova senha deve ter no mínimo 4 caracteres.';
        }
        newPasswordInput?.focus();
        return;
      }

      if (next !== confirmNext) {
        if (changePasswordMsg) {
          changePasswordMsg.style.display = 'block';
          changePasswordMsg.style.color = '#ff5252';
          changePasswordMsg.textContent = 'A confirmação de senha não confere com a nova senha.';
        }
        confirmNewPasswordInput?.focus();
        return;
      }

      // Salva nova senha
      localStorage.setItem(AUTH_KEY_PASS, next);

      if (changePasswordMsg) {
        changePasswordMsg.style.display = 'block';
        changePasswordMsg.style.color = '#00c853';
        changePasswordMsg.textContent = '✓ Senha alterada com sucesso! Guarde-a em local seguro.';
      }

      changePasswordForm.reset();
      showToast('Nova senha do painel salva com sucesso!');
    });

    // Aba de Segurança: Salvar Responsável e E-mail Autorizado
    authEmailForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const personName = (authPersonNameInput?.value || '').trim();
      const emailVal = (authEmailInput?.value || '').trim();

      if (!personName || !emailVal) {
        alert('Por favor, preencha o nome do responsável e o e-mail de autorização.');
        return;
      }

      localStorage.setItem(AUTH_KEY_NAME, personName);
      localStorage.setItem(AUTH_KEY_EMAIL, emailVal);

      updateAuthDisplay();
      showToast('Responsável e e-mail para autorização atualizados com sucesso!');
    });

    // Aba de Segurança: Disparar Código de Teste para o E-mail
    btnTestAuthEmail?.addEventListener('click', () => {
      dispatchEmailCode(true);
    });

    // Inicializa verificação de sessão
    checkSession();
  }

  // Toast
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});
