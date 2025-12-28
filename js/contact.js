// ==================== CONTACT FORM HANDLER ====================

// Validate email format
function isValidEmail(email) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}

// Validate phone number (optional but format check if provided)
function isValidPhone(phone) {
   if (!phone || phone.trim() === '') return true; // Optional field
   const phoneRegex = /^(\+?254|0)?[17]\d{8}$/; // Kenyan phone format
   return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Show error message
function showError(elementId, message) {
   const errorElement = document.getElementById(elementId);
   if (errorElement) {
       errorElement.textContent = message;
       errorElement.style.display = 'block';
       errorElement.style.color = '#E53935';
   }
}

// Clear error message
function clearError(elementId) {
   const errorElement = document.getElementById(elementId);
   if (errorElement) {
       errorElement.textContent = '';
       errorElement.style.display = 'none';
   }
}

// Clear all errors
function clearAllErrors() {
   const errorElements = document.querySelectorAll('.form-error');
   errorElements.forEach(element => {
       element.textContent = '';
       element.style.display = 'none';
   });
}

// Save contact message to localStorage (simulating database)
function saveContactMessage(messageData) {
   try {
       // Get existing messages
       const messages = JSON.parse(localStorage.getItem('aishamart_contact_messages')) || [];
       
       // Add new message
       messages.push(messageData);
       
       // Save back to localStorage
       localStorage.setItem('aishamart_contact_messages', JSON.stringify(messages));
       
       console.log('✅ Contact message saved:', messageData);
       return true;
   } catch (error) {
       console.error('❌ Error saving contact message:', error);
       return false;
   }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
   const contactForm = document.getElementById('contactForm');
   
   if (contactForm) {
       contactForm.addEventListener('submit', function(e) {
           e.preventDefault();
           
           // Clear previous errors
           clearAllErrors();
           
           // Get form values
           const name = document.getElementById('contactName').value.trim();
           const email = document.getElementById('contactEmail').value.trim();
           const phone = document.getElementById('contactPhone').value.trim();
           const subject = document.getElementById('contactSubject').value;
           const message = document.getElementById('contactMessage').value.trim();
           
           // Validation
           let isValid = true;
           
           // Validate name
           if (name.length < 2) {
               showError('contactNameError', 'Name must be at least 2 characters');
               isValid = false;
           }
           
           // Validate email
           if (!isValidEmail(email)) {
               showError('contactEmailError', 'Please enter a valid email address');
               isValid = false;
           }
           
           // Validate phone (if provided)
           if (!isValidPhone(phone)) {
               showError('contactPhoneError', 'Please enter a valid Kenyan phone number');
               isValid = false;
           }
           
           // Validate subject
           if (!subject) {
               showError('contactSubjectError', 'Please select a subject');
               isValid = false;
           }
           
           // Validate message
           if (message.length < 10) {
               showError('contactMessageError', 'Message must be at least 10 characters');
               isValid = false;
           }
           
           // If validation fails, stop here
           if (!isValid) {
               return;
           }
           
           // Create message object
           const messageData = {
               id: Date.now(),
               name: name,
               email: email,
               phone: phone || 'Not provided',
               subject: subject,
               message: message,
               timestamp: new Date().toISOString(),
               status: 'new',
               read: false
           };
           
           // Save message
           const saved = saveContactMessage(messageData);
           
           if (saved) {
               // Hide form
               contactForm.style.display = 'none';
               
               // Show success message
               const successMessage = document.getElementById('formSuccessMessage');
               if (successMessage) {
                   successMessage.style.display = 'block';
               }
               
               // Show notification if auth module is available
               if (typeof authModule !== 'undefined') {
                   authModule.showSuccess('Thank you! Your message has been sent successfully.');
               }
               
               // Scroll to success message
               successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
               
               // Optional: Send email notification (would require backend)
               console.log('📧 Email notification would be sent to admin:', messageData);
               
               // Reset form after a delay
               setTimeout(() => {
                   contactForm.reset();
                   contactForm.style.display = 'block';
                   successMessage.style.display = 'none';
               }, 8000);
           } else {
               // Show error if save failed
               if (typeof authModule !== 'undefined') {
                   authModule.showError('Sorry, there was an error sending your message. Please try again.');
               } else {
                   alert('Sorry, there was an error sending your message. Please try again.');
               }
           }
       });
       
       // Clear errors when user starts typing
       const formInputs = contactForm.querySelectorAll('input, select, textarea');
       formInputs.forEach(input => {
           input.addEventListener('input', function() {
               const errorId = this.id + 'Error';
               clearError(errorId);
           });
       });
   }
});

// ==================== ADMIN: VIEW CONTACT MESSAGES ====================
// This function can be used in the admin panel to view all contact messages
function getAllContactMessages() {
   try {
       const messages = JSON.parse(localStorage.getItem('aishamart_contact_messages')) || [];
       return messages;
   } catch (error) {
       console.error('Error retrieving contact messages:', error);
       return [];
   }
}

// Mark message as read
function markMessageAsRead(messageId) {
   try {
       const messages = JSON.parse(localStorage.getItem('aishamart_contact_messages')) || [];
       const message = messages.find(m => m.id === messageId);
       
       if (message) {
           message.read = true;
           message.status = 'read';
           localStorage.setItem('aishamart_contact_messages', JSON.stringify(messages));
           return true;
       }
       
       return false;
   } catch (error) {
       console.error('Error marking message as read:', error);
       return false;
   }
}

// Delete message
function deleteContactMessage(messageId) {
   try {
       let messages = JSON.parse(localStorage.getItem('aishamart_contact_messages')) || [];
       messages = messages.filter(m => m.id !== messageId);
       localStorage.setItem('aishamart_contact_messages', JSON.stringify(messages));
       return true;
   } catch (error) {
       console.error('Error deleting message:', error);
       return false;
   }
}

// Export functions for admin use
window.contactModule = {
   getAllMessages: getAllContactMessages,
   markAsRead: markMessageAsRead,
   deleteMessage: deleteContactMessage
};

console.log('📞 Contact form module loaded successfully');