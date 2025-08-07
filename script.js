document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function() {
          mainNav.classList.toggle('show');
          this.classList.toggle('active');
      });
  }

  // Service category filters
  const serviceFilters = document.querySelectorAll('.services .filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceFilters.forEach(filter => {
      filter.addEventListener('click', function() {
          // Remove active class from all filters
          serviceFilters.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked filter
          this.classList.add('active');

          const category = this.getAttribute('data-category');

          // Show/hide services based on category
          serviceCards.forEach(card => {
              if (category === 'all' || card.getAttribute('data-category') === category) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  });

  // Gallery category filters
  const galleryFilters = document.querySelectorAll('.gallery .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilters.forEach(filter => {
      filter.addEventListener('click', function() {
          // Remove active class from all filters
          galleryFilters.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked filter
          this.classList.add('active');

          const category = this.getAttribute('data-category');

          // Show/hide gallery items based on category
          galleryItems.forEach(item => {
              if (category === 'all' || item.getAttribute('data-category') === category) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });

  // Booking Modal
  const modal = document.getElementById('bookingModal');
  const bookButtons = document.querySelectorAll('.book-now-btn, .book-service-btn, .cta-button');
  const closeModal = document.querySelector('.close-modal');
  const steps = document.querySelectorAll('.step');
  const stepContents = document.querySelectorAll('.step-content');
  const nextButtons = document.querySelectorAll('.next-btn');
  const backButtons = document.querySelectorAll('.back-btn');
  const confirmButton = document.querySelector('.confirm-booking-btn');

  // Demo data - services
  const services = [
  { name: "Regular Box Braids", price: "$160.00", duration: "3h" },
  { name: "Fulani Braids", price: "$180.00", duration: "3h" },
  { name: "Passion Twist", price: "$200.00", duration: "4h" },
  { name: "Lemonade Braids", price: "$120.00", duration: "2h" },
  { name: "Senegalese Twist", price: "$180.00", duration: "3h" },
  { name: "Knotless Braids", price: "$190.00", duration: "3h" },
  { name: "Boho Knotless Braids", price: "$200.00", duration: "4h" },
  { name: "Faux Locs", price: "$200.00", duration: "4h" },
  { name: "Sew-In", price: "$200.00", duration: "2h" },
  { name: "Crochet", price: "From $150.00", duration: "1.5h" },
  { name: "Women’s Cornrows", price: "$40.00", duration: "1.5h" },
  { name: "Men’s Cornrows", price: "$40.00", duration: "1.5h" },
  { name: "Kid's Regular Box Braids", price: "From $100.00", duration: "3h" },
  { name: "Kid's Fulani Braids", price: "$120.00", duration: "2h" },
  { name: "Kid's Lemonade Braids", price: "$90.00", duration: "2h" },
  { name: "Cornrow with Extensions (Straight Back)", price: "$70.00", duration: "1h" }
];


  // Open modal
  bookButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Reset modal to first step
          goToStep(1);
          // Populate services
          populateServices();
          // Show modal
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
      });
  });

  // Close modal
  if (closeModal) {
      closeModal.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
      });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
      }
  });

  // Populate services in step 1
  function populateServices() {
      const serviceSelection = document.querySelector('.service-selection');
      if (!serviceSelection) return;

      let html = '';
      services.forEach(service => {
          html += `
              <div class="service-option" data-id="${service.id}">
                  <div class="service-option-details">
                      <h4>${service.name}</h4>
                      <div class="service-option-meta">
                          <span class="service-price">${service.price}</span>
                          <span class="service-duration">${service.duration}</span>
                      </div>
                  </div>
                  <div class="service-option-select">
                      <input type="radio" name="service" id="service-${service.id}" value="${service.id}">
                      <label for="service-${service.id}">Select</label>
                  </div>
              </div>
          `;
      });

      serviceSelection.innerHTML = html;

      // Add event listeners to service options
      const serviceOptions = document.querySelectorAll('.service-option');
      const nextBtn = document.querySelector('#step1 .next-btn');

      serviceOptions.forEach(option => {
          option.addEventListener('click', function() {
              const radio = this.querySelector('input[type="radio"]');
              radio.checked = true;

              // Remove selected class from all options
              serviceOptions.forEach(opt => opt.classList.remove('selected'));
              // Add selected class to clicked option
              this.classList.add('selected');

              // Enable next button
              nextBtn.removeAttribute('disabled');
          });
      });
  }

  // Navigation between steps
  function goToStep(stepNumber) {
      // Update steps
      steps.forEach(step => {
          step.classList.remove('active');
          if (parseInt(step.getAttribute('data-step')) <= stepNumber) {
              step.classList.add('active');
          }
      });

      // Show appropriate step content
      stepContents.forEach(content => {
          content.style.display = 'none';
      });
      document.getElementById(`step${stepNumber}`).style.display = 'block';
  }

  // Next buttons
  nextButtons.forEach(button => {
      button.addEventListener('click', function() {
          const currentStep = parseInt(this.closest('.step-content').id.replace('step', ''));
          goToStep(currentStep + 1);
      });
  });

  // Back buttons
  backButtons.forEach(button => {
      button.addEventListener('click', function() {
          const currentStep = parseInt(this.closest('.step-content').id.replace('step', ''));
          goToStep(currentStep - 1);
      });
  });

  // Demo date picker functionality
  // In a real implementation, you would use a proper date picker library
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const calendarContainer = document.querySelector('.calendar');
  if (calendarContainer) {
      renderCalendar(currentMonth, currentYear);
  }

  function renderCalendar(month, year) {
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      let html = `
          <div class="calendar-header">
              <button class="prev-month">&lt;</button>
              <h4>${monthNames[month]} ${year}</h4>
              <button class="next-month">&gt;</button>
          </div>
          <div class="calendar-grid">
              <div class="weekday">Sun</div>
              <div class="weekday">Mon</div>
              <div class="weekday">Tue</div>
              <div class="weekday">Wed</div>
              <div class="weekday">Thu</div>
              <div class="weekday">Fri</div>
              <div class="weekday">Sat</div>
      `;

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
          html += `<div class="day empty"></div>`;
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day);
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
          const isPast = date < today;
          const isSunday = date.getDay() === 0;

          let className = 'day';
          if (isToday) className += ' today';
          if (isPast || isSunday) className += ' disabled';

          html += `<div class="${className}" data-date="${year}-${month+1}-${day}">${day}</div>`;
      }

      html += `</div>`;
      calendarContainer.innerHTML = html;

      // Add event listeners
      const prevMonth = document.querySelector('.prev-month');
      const nextMonth = document.querySelector('.next-month');
      const days = document.querySelectorAll('.day:not(.empty):not(.disabled)');

      prevMonth.addEventListener('click', function() {
          currentMonth--;
          if (currentMonth < 0) {
              currentMonth = 11;
              currentYear--;
          }
          renderCalendar(currentMonth, currentYear);
      });

      nextMonth.addEventListener('click', function() {
          currentMonth++;
          if (currentMonth > 11) {
              currentMonth = 0;
              currentYear++;
          }
          renderCalendar(currentMonth, currentYear);
      });

      days.forEach(day => {
          day.addEventListener('click', function() {
              // Remove selected class from all days
              days.forEach(d => d.classList.remove('selected'));
              // Add selected class to clicked day
              this.classList.add('selected');

              // Generate time slots
              generateTimeSlots();
          });
      });
  }

  // Generate time slots
  function generateTimeSlots() {
      const timeSlotsContainer = document.querySelector('.time-slots');
      if (!timeSlotsContainer) return;

      let html = '<h4>Available Times</h4>';

      // Demo time slots
      const timeSlots = [
          { time: '9:00 AM', available: true },
          { time: '10:00 AM', available: true },
          { time: '11:00 AM', available: false },
          { time: '12:00 PM', available: true },
          { time: '1:00 PM', available: true },
          { time: '2:00 PM', available: false },
          { time: '3:00 PM', available: true },
          { time: '4:00 PM', available: true },
          { time: '5:00 PM', available: true }
      ];

      html += '<div class="time-slots-grid">';
      timeSlots.forEach(slot => {
          let className = 'time-slot';
          if (!slot.available) className += ' disabled';

          html += `<div class="${className}" data-time="${slot.time}">${slot.time}</div>`;
      });
      html += '</div>';

      timeSlotsContainer.innerHTML = html;

      // Add event listeners
      const slots = document.querySelectorAll('.time-slot:not(.disabled)');
      const nextBtn = document.querySelector('#step2 .next-btn');

      slots.forEach(slot => {
          slot.addEventListener('click', function() {
              // Remove selected class from all slots
              slots.forEach(s => s.classList.remove('selected'));
              // Add selected class to clicked slot
              this.classList.add('selected');

              // Enable next button
              nextBtn.removeAttribute('disabled');
          });
      });
  }

  // Handle form submission for booking
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
      const step3NextBtn = document.querySelector('#step3 .next-btn');

      // Add input event listeners to form fields
      const requiredInputs = bookingForm.querySelectorAll('input[required]');

      requiredInputs.forEach(input => {
          input.addEventListener('input', validateBookingForm);
      });

      function validateBookingForm() {
            let isValid = true;

            requiredInputs.forEach(input => {
                if (!input.value || input.value.trim() === '') {
                    isValid = false;
                }

                if (input.id === 'bookingEmail' && !input.value.includes('@')) {
                    isValid = false;
                }

                if (input.id === 'phone' && input.value.length < 10) {
                    isValid = false;
                }
            });

            if (isValid) {
                step3NextBtn.removeAttribute('disabled');
            } else {
                step3NextBtn.setAttribute('disabled', '');
            }
        }

      // Generate booking summary
      step3NextBtn.addEventListener('click', function() {
          generateBookingSummary();
      });
  }

  // Generate booking summary
  function generateBookingSummary() {
      const summaryContainer = document.querySelector('.booking-summary');
      if (!summaryContainer) return;

      // Get selected service
      const selectedService = document.querySelector('.service-option input[type="radio"]:checked');
      const serviceName = selectedService ? selectedService.closest('.service-option').querySelector('h4').textContent : '';
      const servicePrice = selectedService ? selectedService.closest('.service-option').querySelector('.service-price').textContent : '';

      // Get selected date
      const selectedDate = document.querySelector('.day.selected');
      const dateStr = selectedDate ? selectedDate.getAttribute('data-date') : '';

      // Get selected time
      const selectedTime = document.querySelector('.time-slot.selected');
      const timeStr = selectedTime ? selectedTime.getAttribute('data-time') : '';

      // Get form data
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('bookingEmail').value;
      const phone = document.getElementById('phone').value;
      const notes = document.getElementById('notes').value;

      // Format date
      let formattedDate = '';
      if (dateStr) {
          const dateParts = dateStr.split('-');
          const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
          formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      }

      // Generate summary
      let html = `
          <div class="summary-section">
              <h4>Service</h4>
              <p>${serviceName}</p>
              <p>${servicePrice}</p>
          </div>
          <div class="summary-section">
              <h4>Date & Time</h4>
              <p>${formattedDate}</p>
              <p>${timeStr}</p>
          </div>
          <div class="summary-section">
              <h4>Contact Information</h4>
              <p>${firstName} ${lastName}</p>
              <p>${email}</p>
              <p>${phone}</p>
          </div>
      `;

      if (notes) {
          html += `
              <div class="summary-section">
                  <h4>Notes</h4>
                  <p>${notes}</p>
              </div>
          `;
      }

      summaryContainer.innerHTML = html;
  }

    // Confirm booking button
    if (confirmButton) {
      confirmButton.addEventListener('click', async function () {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('bookingEmail').value;
        const phone = document.getElementById('phone').value;
        const notes = document.getElementById('notes').value;

        const selectedService = document.querySelector('.service-option input[type="radio"]:checked');
        const serviceName = selectedService
          ? selectedService.closest('.service-option').querySelector('h4').textContent
          : '';
        const servicePrice = selectedService
          ? selectedService.closest('.service-option').querySelector('.service-price')?.textContent || ''
          : '';

        const selectedDate = document.querySelector('.day.selected');
        const dateStr = selectedDate ? selectedDate.getAttribute('data-date') : '';

        const selectedTime = document.querySelector('.time-slot.selected');
        const timeStr = selectedTime ? selectedTime.getAttribute('data-time') : '';

        if (!firstName || !lastName || !email || !phone || !serviceName || !dateStr || !timeStr) {
          alert('Please complete all required booking information.');
          return;
        }

        try {
          const response = await fetch('/send-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              phone,
              notes,
              service: serviceName,
              date: dateStr,
              time: timeStr,
              price: servicePrice  // ✅ this sends the price to the server
            })
          });

          if (response.ok) {
            alert('Your booking has been confirmed! You will receive a confirmation email shortly.');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
          } else {
            alert('Failed to submit booking. Please try again.');
          }
        } catch (err) {
          console.error('Booking error:', err);
          alert('Error submitting booking. Please try again.');
        }
      });
    }

  // Contact form submission
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();

          // In a real implementation, you would send the form data to a server here

          alert('Your message has been sent! We will get back to you as soon as possible.');
          contactForm.reset();
      });
  }
});
document.getElementById("booking-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;

  fetch("https://script.google.com/macros/s/AKfycbypWGQZp6ZJJqeTVwAk8i7mv_Nj_dY6hT8qRtML3UU4zHHSFWjVtPBHA9vdmFXLZWRzFg/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name,
      email,
      service,
      date,
      notes,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        window.location.href = data.redirect;
      } else {
        alert("Booking failed: " + data.error);
      }
    })
    .catch((err) => {
      alert("Error: " + err.message);
    });
});
