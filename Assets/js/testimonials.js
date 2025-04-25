const testimonialsSection = document.getElementById('testimonials-section');
const placeholderImage = "Assets/images/user_placeholder.jpg"; // Fallback placeholder image

// Fetch testimonials data from the Google Sheet
async function fetchTestimonials() {
  try {
    const response = await fetch('https://example.com/testimonials.csv');  // Update with your actual CSV link
    const data = await response.text();
    const testimonials = parseCSV(data);
    renderTestimonials(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
}

// Parse the CSV data
function parseCSV(data) {
  const lines = data.split('\n');
  const testimonials = lines.map(line => {
    const [name, profilePic, rank, message] = line.split(',');
    return { name, profilePic, rank, message };
  });
  return testimonials;
}

// Render the testimonials dynamically
function renderTestimonials(testimonials) {
  // Creating a 2-row layout with the first and second rows
  let rowIndex = 0;
  let rowHTML = '';
  let rowCount = 0;

  testimonials.forEach((testimonial, index) => {
    const { name, profilePic, rank, message } = testimonial;

    // Default profile picture if not provided
    const profileImage = profilePic ? profilePic : placeholderImage;

    const cardHTML = `
      <div class="w-full ${rowCount === 1 ? 'md:w-[40%]' : 'md:w-[30%]'} bg-white dark:bg-[#333a40] border border-[#333a40] dark:border-transparent rounded-xl p-6 space-y-4" 
        data-aos="${rowCount === 1 ? 'fade-right' : 'fade-left'}">
        <p class=" text-gray-700 dark:text-gray-200">${message}</p>
        <hr class="border-t border-gray-400 mx-4" />
        <div class="flex items-center gap-4 mt-4">
          <img src="${profileImage}" alt="User" class="w-12 h-12 rounded-full object-cover ring-4 ring-[#796459] shadow-[0_0_20px_#796459]" />
          <div>
            <h4 class="text-gray-800 dark:text-white font-semibold">${name}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-300">${rank}</p>
          </div>
        </div>
      </div>
    `;

    rowHTML += cardHTML;

    rowCount++;
    if (rowCount === 3) {
      testimonialsSection.innerHTML += `
        <div class="flex flex-col md:flex-row justify-center gap-4 mb-8">${rowHTML}</div>
      `;
      rowHTML = '';  // Reset rowHTML for the next row
      rowCount = 0;  // Reset rowCount
    }
  });

  // If there are any remaining cards (less than 3 in the last row)
  if (rowHTML) {
    testimonialsSection.innerHTML += `
      <div class="flex flex-col md:flex-row justify-center gap-4 mb-8">${rowHTML}</div>
    `;
  }
}

// Call fetchTestimonials function
fetchTestimonials();
