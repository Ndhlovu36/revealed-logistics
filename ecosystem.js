// Ndhlovu36 6-App Ecosystem - Mainnet Ready
// Version 1.0 - August 2026 - Pi Network
const NDHLOVU_ECOSYSTEM = {
  apps: {
    hub: { name: "Gauteng Shopping Hub", url: "https://ndhlovu36.github.io/gauteng-shopping-hub/", role: "Main Mall" },
    marble: { name: "Marble Floors SA", url: "https://ndhlovu36.github.io/marble-floors-south-africa/", role: "Flooring Shop" },
    agri: { name: "Agri Equipment Market", url: "https://ndhlovu36.github.io/agricultural-equipment-market/", role: "Farming Shop" },
    building: { name: "Resurrected Building Projects", url: "https://ndhlovu36.github.io/resurrected-building-projects/", role: "Construction Service" },
    bus: { name: "Revelation Bus Company", url: "https://ndhlovu36.github.io/revelation-bus-company/", role: "Passenger Transport" },
    logistics: { name: "Revealed Logistics", url: "https://ndhlovu36.github.io/revealed-logistics/", role: "Goods Delivery" }
  },
  
  // Shared Pi User Session across 6 apps
  init() {
    const piUser = localStorage.getItem('pi_username');
    const piUid = localStorage.getItem('pi_uid');
    if(piUser) {
      console.log(`Welcome back ${piUser} - Ecosystem active`);
      this.showEcosystemBar(piUser);
    }
  },
  
  // Save login from any app to all apps
  saveSession(auth) {
    localStorage.setItem('pi_username', auth.user.username);
    localStorage.setItem('pi_uid', auth.user.uid);
    localStorage.setItem('ecosystem_login_time', new Date().toISOString());
  },
  
  // Show floating bar to navigate between 6 apps
  showEcosystemBar(username) {
    if(document.getElementById('ecosystem-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'ecosystem-bar';
    bar.innerHTML = `
      <div style="position:fixed;bottom:0;left:0;right:0;background:#1a237e;color:#fff;padding:10px 15px;display:flex;gap:8px;overflow-x:auto;z-index:9999;font-family:Arial;font-size:13px;align-items:center">
        <span style="font-weight:bold;white-space:nowrap">🏪 @${username} | Eco:</span>
        ${Object.values(this.apps).map(a => `<a href="${a.url}" style="color:#ffeb3b;text-decoration:none;white-space:nowrap;border:1px solid #fff;padding:3px 8px;border-radius:12px">${a.name}</a>`).join('')}
        <span style="margin-left:auto;cursor:pointer" onclick="this.parentElement.parentElement.remove()">✕</span>
      </div>`;
    document.body.appendChild(bar);
  },
  
  // Cross-app order creation
  createCrossAppOrder(fromApp, toApp, orderData) {
    // Example: Marble Floors needs delivery -> send to Revealed Logistics
    const order = {
      id: `${fromApp}-${Date.now()}`,
      from: fromApp,
      to: toApp,
      pi_user: localStorage.getItem('pi_username'),
      data: orderData,
      time: new Date().toISOString(),
      status: 'pending_pi_payment'
    };
    localStorage.setItem(`cross_order_${order.id}`, JSON.stringify(order));
    console.log("Cross-app order created:", order);
    return order;
  }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => NDHLOVU_ECOSYSTEM.init());
