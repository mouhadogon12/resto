var small_menu = document.querySelector('.toggle_menu')
var menu = document.querySelector('.menu')

small_menu.onclick = function(){
     small_menu.classList.toggle('active');
     menu.classList.toggle('responsive');
}
document.addEventListener('DOMContentLoaded', () => {
     // Sélectionner tous les boutons d'achat
     const buyButtons = document.querySelectorAll('.buy-btn');
   
     buyButtons.forEach(button => {
       button.addEventListener('click', (event) => {
         event.preventDefault(); // Empêche l'action par défaut du lien
         
         // Récupérer l'élément parent (le plat)
         const dishElement = event.target.closest('.dish');
         
         // Créer l'élément de message
         const message = document.createElement('div');
         message.textContent = 'Produit ajouté au panier !';
         message.classList.add('feedback-message');
         
         // Ajouter le message à l'intérieur de l'élément du plat
         dishElement.appendChild(message);
         
         // Après 1,5 seconde, lancer l'animation de disparition
         setTimeout(() => {
           message.classList.add('fade-out');
         }, 1500);
         
         // Supprimer l'élément du message après 2 secondes
         setTimeout(() => {
           message.remove();
         }, 2000);
       });
     });
   });
   

   function showOrderForm() {
     // Création du modal
     const modal = document.createElement('div');
     modal.className = 'order-modal';
     modal.innerHTML = `
         <div class="order-form">
             <h3>Formulaire de Commande</h3>
             <form id="orderForm">
                 <div class="form-group">
                     <label>Nom complet *</label>
                     <input type="text" id="fullName" required>
                     <div class="error-message" id="nameError"></div>
                 </div>
 
                 <div class="form-group">
                     <label>Téléphone *</label>
                     <input type="tel" id="phone" pattern="[0-9]{9}" required>
                     <div class="error-message" id="phoneError"></div>
                 </div>
 
                 <div class="form-group">
                     <label>Adresse de livraison *</label>
                     <textarea id="address" rows="3" required></textarea>
                     <div class="error-message" id="addressError"></div>
                 </div>
 
                 <div class="form-group">
                     <label>Nombre de plat</label>
                     <select id="quantity">
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                         <option value="5">5</option>
                     </select>
                 </div>
 
                 <div class="form-group">
                     <label>Mode de livraison</label>
                     <select id="delivery">
                         <option value="pickup">Retrait sur place</option>
                         <option value="delivery">Livraison à domicile</option>
                     </select>
                 </div>
 
                 <div class="form-buttons">
                     <button type="button" onclick="closeOrderForm()">Annuler</button>
                     <button type="submit" class="btn-submit">Valider la commande</button>
                 </div>
             </form>
         </div>
     `;
 
     document.body.appendChild(modal);
     modal.style.display = 'flex';
 
     // Validation du formulaire
     document.getElementById('orderForm').addEventListener('submit', function(e) {
         e.preventDefault();
         validateForm();
     });
 
     // Fermer le modal en cliquant à l'extérieur
     modal.addEventListener('click', (e) => {
         if (e.target === modal) closeOrderForm();
     });
 }
 
 function validateForm() {
     const name = document.getElementById('fullName').value;
     const phone = document.getElementById('phone').value;
     const address = document.getElementById('address').value;
     let isValid = true;
 
     // Validation du nom
     if (name.trim() === '') {
         showError('nameError', 'Veuillez entrer votre nom complet');
         isValid = false;
     }
 
     // Validation du téléphone
     const phoneRegex = /^[0-9]{9}$/;
     if (!phoneRegex.test(phone)) {
         showError('phoneError', 'Numéro invalide (9 chiffres requis)');
         isValid = false;
     }
 
     // Validation de l'adresse
     if (address.trim() === '') {
         showError('addressError', 'Veuillez entrer une adresse');
         isValid = false;
     }
 
     if (isValid) {
         processOrder();
     }
 }
 
 function showError(elementId, message) {
     const errorElement = document.getElementById(elementId);
     errorElement.textContent = message;
     errorElement.style.display = 'block';
 }
 
 function processOrder() {
     // Récupérer les données du formulaire
     const orderData = {
         name: document.getElementById('fullName').value,
         phone: document.getElementById('phone').value,
         address: document.getElementById('address').value,
         quantity: document.getElementById('quantity').value,
         delivery: document.getElementById('delivery').value,
         items: JSON.parse(localStorage.getItem('cart')) || []
     };
 
     // Envoyer les données (à adapter avec votre backend)
     console.log('Commande validée:', orderData);
     alert('Commande envoyée avec succès! Nous vous contacterons pour la livraison.');
     closeOrderForm();
     localStorage.removeItem('cart');
     updateCartDisplay();
 }
 
 function closeOrderForm() {
     const modal = document.querySelector('.order-modal');
     if (modal) modal.remove();
 }

 