document.addEventListener("DOMContentLoaded", () => {
  // Get all elements that should open the booking modal
  const bookingButtons = document.querySelectorAll(".book-now-btn, .cta-button, .book-service-btn")
  const modal = document.getElementById("bookingModal")
  const closeModal = document.querySelector(".close-modal")
  const serviceSelect = document.getElementById("serviceType")

  // Function to open the modal
  function openModal(serviceName = null) {
    if (modal) {
      // If a specific service was clicked, pre-select it in the dropdown
      if (serviceName && serviceSelect) {
        // Find the option that contains the service name
        const options = serviceSelect.options
        for (let i = 0; i < options.length; i++) {
          if (options[i].text.includes(serviceName)) {
            serviceSelect.selectedIndex = i
            break
          }
        }
      }

      modal.style.display = "block"
    }
  }

  // Function to close the modal
  function closeModalFunc() {
    if (modal) {
      modal.style.display = "none"
    }
  }

  // Add click event to all booking buttons
  if (bookingButtons.length) {
    bookingButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault()

        // If this is a service card button, get the service name
        let serviceName = null
        if (this.classList.contains("book-service-btn")) {
          const serviceCard = this.closest(".service-card")
          if (serviceCard) {
            const serviceTitle = serviceCard.querySelector("h3")
            if (serviceTitle) {
              serviceName = serviceTitle.textContent
            }
          }
        }

        openModal(serviceName)
      })
    })
  }

  // Close modal when clicking the X
  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunc)
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc()
    }
  })

  // Handle form submission
  const bookingForm = document.getElementById("bookingForm")
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      // Form will submit normally to the Google Apps Script URL
      // Just add a loading state to the button
      const submitBtn = this.querySelector(".submit-btn")
      if (submitBtn) {
        submitBtn.textContent = "Submitting..."
        submitBtn.disabled = true

        // Re-enable after 5 seconds in case of network issues
        setTimeout(() => {
          submitBtn.textContent = "Submit Booking"
          submitBtn.disabled = false
        }, 5000)
      }
    })
  }

  // Set current year in footer copyright
  const yearElement = document.getElementById("currentYear")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
})

document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const yearElement = document.getElementById("currentYear")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("show")
      this.classList.toggle("active")
    })
  }

  // Service category filters
  const serviceFilters = document.querySelectorAll(".services .filter-btn")
  const serviceCards = document.querySelectorAll(".service-card")

  serviceFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      // Remove active class from all filters
      serviceFilters.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked filter
      this.classList.add("active")

      const category = this.getAttribute("data-category")

      // Show/hide services based on category
      serviceCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Gallery category filters
  const galleryFilters = document.querySelectorAll(".gallery .filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      // Remove active class from all filters
      galleryFilters.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked filter
      this.classList.add("active")

      const category = this.getAttribute("data-category")

      // Show/hide gallery items based on category
      galleryItems.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // FIXED: Booking Modal - FIXED VERSION
  const modal = document.getElementById("bookingModal")
  const bookButtons = document.querySelectorAll(".book-now-btn, .book-service-btn, .cta-button")
  const closeModal = document.querySelector(".close-modal")
  const steps = document.querySelectorAll(".step")
  const stepContents = document.querySelectorAll(".step-content")
  const nextButtons = document.querySelectorAll(".next-btn")
  const backButtons = document.querySelectorAll(".back-btn")
  const confirmButton = document.querySelector(".confirm-booking-btn")

  // Services data with proper IDs
  const services = [
    { id: 1, name: "Regular Box Braids", price: "$160.00", duration: "3h" },
    { id: 2, name: "Fulani Braids", price: "$180.00", duration: "3h" },
    { id: 3, name: "Passion Twist", price: "$200.00", duration: "4h" },
    { id: 4, name: "Lemonade Braids", price: "$120.00", duration: "2h" },
    { id: 5, name: "Senegalese Twist", price: "$180.00", duration: "3h" },
    { id: 6, name: "Knotless Braids", price: "$190.00", duration: "3h" },
    { id: 7, name: "Boho Knotless Braids", price: "$200.00", duration: "4h" },
    { id: 8, name: "Faux Locs", price: "$200.00", duration: "4h" },
    { id: 9, name: "Sew-In", price: "$200.00", duration: "2h" },
    { id: 10, name: "Crochet", price: "From $150.00", duration: "1.5h" },
    { id: 11, name: "Women's Cornrows", price: "$40.00", duration: "1.5h" },
    { id: 12, name: "Men's Cornrows", price: "$40.00", duration: "1.5h" },
    { id: 13, name: "Kid's Regular Box Braids", price: "From $100.00", duration: "3h" },
    { id: 14, name: "Kid's Fulani Braids", price: "$120.00", duration: "2h" },
    { id: 15, name: "Kid's Lemonade Braids", price: "$90.00", duration: "2h" },
    { id: 16, name: "Cornrow with Extensions (Straight Back)", price: "$70.00", duration: "1h" },
  ]

  // FIXED: Open modal function
  function openBookingModal(preSelectedService = null) {
    if (!modal) return

    // Reset modal to first step
    goToStep(1)
    // Populate services
    populateServices(preSelectedService)
    // Show modal
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  }

  // FIXED: Add event listeners to all booking buttons
  if (bookButtons.length > 0) {
    bookButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()

        // Check if this is a service-specific button
        let preSelectedService = null
        if (this.classList.contains("book-service-btn")) {
          const serviceCard = this.closest(".service-card")
          if (serviceCard) {
            const serviceTitle = serviceCard.querySelector("h3")
            if (serviceTitle) {
              preSelectedService = serviceTitle.textContent.trim()
            }
          }
        }

        openBookingModal(preSelectedService)
      })
    })
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // FIXED: Populate services with pre-selection
  function populateServices(preSelectedService = null) {
    const serviceSelection = document.querySelector(".service-selection")
    if (!serviceSelection) return

    let html = ""
    services.forEach((service) => {
      const isSelected = preSelectedService && service.name === preSelectedService
      html += `
              <div class="service-option ${isSelected ? "selected" : ""}" data-id="${service.id}">
                  <div class="service-option-details">
                      <h4>${service.name}</h4>
                      <div class="service-option-meta">
                          <span class="service-price">${service.price}</span>
                          <span class="service-duration">${service.duration}</span>
                      </div>
                  </div>
                  <div class="service-option-select">
                      <input type="radio" name="service" id="service-${service.id}" value="${service.id}" ${isSelected ? "checked" : ""}>
                      <label for="service-${service.id}">Select</label>
                  </div>
              </div>
          `
    })

    serviceSelection.innerHTML = html

    // Add event listeners to service options
    const serviceOptions = document.querySelectorAll(".service-option")
    const nextBtn = document.querySelector("#step1 .next-btn")

    // Enable next button if a service is pre-selected
    if (preSelectedService && nextBtn) {
      nextBtn.removeAttribute("disabled")
    }

    serviceOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const radio = this.querySelector('input[type="radio"]')
        radio.checked = true

        // Remove selected class from all options
        serviceOptions.forEach((opt) => opt.classList.remove("selected"))
        // Add selected class to clicked option
        this.classList.add("selected")

        // Enable next button
        if (nextBtn) {
          nextBtn.removeAttribute("disabled")
        }
      })
    })
  }

  // Navigation between steps
  function goToStep(stepNumber) {
    // Update steps
    if (steps.length > 0) {
      steps.forEach((step) => {
        step.classList.remove("active")
        if (Number.parseInt(step.getAttribute("data-step")) <= stepNumber) {
          step.classList.add("active")
        }
      })
    }

    // Show appropriate step content
    if (stepContents.length > 0) {
      stepContents.forEach((content) => {
        content.style.display = "none"
      })

      const targetStep = document.getElementById(`step${stepNumber}`)
      if (targetStep) {
        targetStep.style.display = "block"
      }
    }
  }

  // Next buttons
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = Number.parseInt(this.closest(".step-content").id.replace("step", ""))
      goToStep(currentStep + 1)
    })
  })

  // Back buttons
  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = Number.parseInt(this.closest(".step-content").id.replace("step", ""))
      goToStep(currentStep - 1)
    })
  })

  // Calendar functionality
  const today = new Date()
  let currentMonth = today.getMonth()
  let currentYear = today.getFullYear()

  const calendarContainer = document.querySelector(".calendar")
  if (calendarContainer) {
    renderCalendar(currentMonth, currentYear)
  }

  function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

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
      `

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="day empty"></div>`
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
      const isPast = date < today
      const isSunday = date.getDay() === 0

      let className = "day"
      if (isToday) className += " today"
      if (isPast || isSunday) className += " disabled"

      html += `<div class="${className}" data-date="${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}">${day}</div>`
    }

    html += `</div>`
    calendarContainer.innerHTML = html

    // Add event listeners
    const prevMonth = document.querySelector(".prev-month")
    const nextMonth = document.querySelector(".next-month")
    const days = document.querySelectorAll(".day:not(.empty):not(.disabled)")

    if (prevMonth) {
      prevMonth.addEventListener("click", () => {
        currentMonth--
        if (currentMonth < 0) {
          currentMonth = 11
          currentYear--
        }
        renderCalendar(currentMonth, currentYear)
      })
    }

    if (nextMonth) {
      nextMonth.addEventListener("click", () => {
        currentMonth++
        if (currentMonth > 11) {
          currentMonth = 0
          currentYear++
        }
        renderCalendar(currentMonth, currentYear)
      })
    }

    days.forEach((day) => {
      day.addEventListener("click", function () {
        // Remove selected class from all days
        days.forEach((d) => d.classList.remove("selected"))
        // Add selected class to clicked day
        this.classList.add("selected")

        // Generate time slots
        generateTimeSlots()
      })
    })
  }

  // Generate time slots
  function generateTimeSlots() {
    const timeSlotsContainer = document.querySelector(".time-slots")
    if (!timeSlotsContainer) return

    let html = "<h4>Available Times</h4>"

    // Demo time slots
    const timeSlots = [
      { time: "9:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: false },
      { time: "12:00 PM", available: true },
      { time: "1:00 PM", available: true },
      { time: "2:00 PM", available: false },
      { time: "3:00 PM", available: true },
      { time: "4:00 PM", available: true },
      { time: "5:00 PM", available: true },
    ]

    html += '<div class="time-slots-grid">'
    timeSlots.forEach((slot) => {
      let className = "time-slot"
      if (!slot.available) className += " disabled"

      html += `<div class="${className}" data-time="${slot.time}">${slot.time}</div>`
    })
    html += "</div>"

    timeSlotsContainer.innerHTML = html

    // Add event listeners
    const slots = document.querySelectorAll(".time-slot:not(.disabled)")
    const nextBtn = document.querySelector("#step2 .next-btn")

    slots.forEach((slot) => {
      slot.addEventListener("click", function () {
        // Remove selected class from all slots
        slots.forEach((s) => s.classList.remove("selected"))
        // Add selected class to clicked slot
        this.classList.add("selected")

        // Enable next button
        if (nextBtn) {
          nextBtn.removeAttribute("disabled")
        }
      })
    })
  }

  // Handle form validation
  const bookingForm = document.getElementById("bookingForm")

  if (bookingForm) {
    const step3NextBtn = document.querySelector("#step3 .next-btn")
    const requiredInputs = bookingForm.querySelectorAll("input[required]")

    requiredInputs.forEach((input) => {
      input.addEventListener("input", validateBookingForm)
    })

    function validateBookingForm() {
      let isValid = true

      requiredInputs.forEach((input) => {
        if (!input.value || input.value.trim() === "") {
          isValid = false
        }

        if (input.id === "bookingEmail" && !input.value.includes("@")) {
          isValid = false
        }

        if (input.id === "phone" && input.value.length < 10) {
          isValid = false
        }
      })

      if (step3NextBtn) {
        if (isValid) {
          step3NextBtn.removeAttribute("disabled")
        } else {
          step3NextBtn.setAttribute("disabled", "")
        }
      }
    }

    // Generate booking summary
    if (step3NextBtn) {
      step3NextBtn.addEventListener("click", () => {
        generateBookingSummary()
      })
    }
  }

  // Generate booking summary
  function generateBookingSummary() {
    const summaryContainer = document.querySelector(".booking-summary")
    if (!summaryContainer) return

    // Get selected service
    const selectedService = document.querySelector('.service-option input[type="radio"]:checked')
    const serviceName = selectedService
      ? selectedService.closest(".service-option").querySelector("h4").textContent
      : ""
    const servicePrice = selectedService
      ? selectedService.closest(".service-option").querySelector(".service-price").textContent
      : ""

    // Get selected date
    const selectedDate = document.querySelector(".day.selected")
    const dateStr = selectedDate ? selectedDate.getAttribute("data-date") : ""

    // Get selected time
    const selectedTime = document.querySelector(".time-slot.selected")
    const timeStr = selectedTime ? selectedTime.getAttribute("data-time") : ""

    // Get form data
    const firstName = document.getElementById("firstName")?.value || ""
    const lastName = document.getElementById("lastName")?.value || ""
    const email = document.getElementById("bookingEmail")?.value || ""
    const phone = document.getElementById("phone")?.value || ""
    const notes = document.getElementById("notes")?.value || ""

    // Format date
    let formattedDate = ""
    if (dateStr) {
      const dateParts = dateStr.split("-")
      const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
      formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
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
      `

    if (notes) {
      html += `
              <div class="summary-section">
                  <h4>Notes</h4>
                  <p>${notes}</p>
              </div>
          `
    }

    summaryContainer.innerHTML = html
  }

  // FIXED: Confirm booking button with proper Google Apps Script submission
  if (confirmButton) {
    confirmButton.addEventListener("click", async function () {
      const firstName = document.getElementById("firstName")?.value || ""
      const lastName = document.getElementById("lastName")?.value || ""
      const email = document.getElementById("bookingEmail")?.value || ""
      const phone = document.getElementById("phone")?.value || ""
      const notes = document.getElementById("notes")?.value || ""

      const selectedService = document.querySelector('.service-option input[type="radio"]:checked')
      const serviceName = selectedService
        ? selectedService.closest(".service-option").querySelector("h4").textContent
        : ""
      const servicePrice = selectedService
        ? selectedService.closest(".service-option").querySelector(".service-price")?.textContent || ""
        : ""

      const selectedDate = document.querySelector(".day.selected")
      const dateStr = selectedDate ? selectedDate.getAttribute("data-date") : ""

      const selectedTime = document.querySelector(".time-slot.selected")
      const timeStr = selectedTime ? selectedTime.getAttribute("data-time") : ""

      if (!firstName || !lastName || !email || !phone || !serviceName || !dateStr || !timeStr) {
        alert("Please complete all required booking information.")
        return
      }

      // Disable button during submission
      this.disabled = true
      this.textContent = "Submitting..."

      try {
        // Create form data for Google Apps Script
        const formData = new FormData()
        formData.append("name", `${firstName} ${lastName}`)
        formData.append("email", email)
        formData.append("service", `${serviceName} — ${servicePrice}`)
        formData.append("date", dateStr)
        formData.append("notes", `Phone: ${phone}\nTime: ${timeStr}\nNotes: ${notes}`)

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbypWGQZp6ZJJqeTVwAk8i7mv_Nj_dY6hT8qRtML3UU4zHHSFWjVtPBHA9vdmFXLZWRzFg/exec",
          {
            method: "POST",
            body: formData,
          },
        )

        if (response.ok) {
          alert("✅ Your booking has been confirmed! You will receive a confirmation email shortly.")
          modal.style.display = "none"
          document.body.style.overflow = "auto"

          // Reset form
          if (bookingForm) {
            bookingForm.reset()
          }
        } else {
          throw new Error("Failed to submit booking")
        }
      } catch (err) {
        console.error("Booking error:", err)
        alert("❌ Error submitting booking. Please try calling us directly at (347) 547-5918.")
      } finally {
        // Re-enable button
        this.disabled = false
        this.textContent = "Confirm Booking"
      }
    })
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const name = document.getElementById("name")?.value
      const email = document.getElementById("email")?.value
      const subject = document.getElementById("subject")?.value
      const message = document.getElementById("message")?.value

      if (!name || !email || !subject || !message) {
        alert("Please fill out all fields.")
        return
      }

      // You can add actual form submission here
      alert("✅ Your message has been sent! We will get back to you as soon as possible.")
      contactForm.reset()
    })
  }
})

// Add styling for the booking modal (keeping your original styles)
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
  /* Service options */
  .service-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 5px;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: all 0.3s;
  }

  .service-option:hover, .service-option.selected {
      border-color: #8a2be2;
      background-color: rgba(138, 43, 226, 0.05);
  }

  .service-option-details h4 {
      margin-bottom: 0.5rem;
  }

  .service-option-meta {
      display: flex;
      gap: 1rem;
      color: #666;
      font-size: 0.875rem;
  }

  .service-option-select {
      display: flex;
      align-items: center;
  }

  .service-option-select input {
      margin-right: 0.5rem;
  }

  /* Calendar */
  .calendar {
      margin-bottom: 2rem;
  }

  .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
  }

  .calendar-header button {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      color: #555;
  }

  .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.5rem;
  }

  .weekday {
      text-align: center;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
  }

  .day {
      text-align: center;
      padding: 0.75rem;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
  }

  .day:hover:not(.empty):not(.disabled) {
      background-color: rgba(138, 43, 226, 0.1);
  }

  .day.today {
      background-color: rgba(138, 43, 226, 0.2);
      font-weight: 600;
  }

  .day.selected {
      background-color: #8a2be2;
      color: white;
      font-weight: 600;
  }

  .day.disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }

  .day.empty {
      cursor: default;
  }

  /* Time slots */
  .time-slots h4 {
      margin-bottom: 1rem;
  }

  .time-slots-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
  }

  .time-slot {
      text-align: center;
      padding: 0.75rem;
      border: 1px solid #eee;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
  }

  .time-slot:hover:not(.disabled) {
      border-color: #8a2be2;
      background-color: rgba(138, 43, 226, 0.05);
  }

  .time-slot.selected {
      border-color: #8a2be2;
      background-color: #8a2be2;
      color: white;
  }

  .time-slot.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      text-decoration: line-through;
  }

  /* Booking summary */
  .summary-section {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eee;
  }

  .summary-section:last-child {
      border-bottom: none;
  }

  .summary-section h4 {
      margin-bottom: 0.5rem;
      color: #555;
  }

  .summary-section p {
      margin-bottom: 0.25rem;
  }
</style>
`,
)
