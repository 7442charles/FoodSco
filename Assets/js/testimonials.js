function select(a) {
    return document.querySelector(a);
}
const placeholderImage = "Assets/images/user_placeholder.jpg"; // Fallback placeholder image


async function fetchTestimonials() {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4QcNOYmvwfZzjvEkJtOtvn8y16V_AOn3dzJwFaw_gU6NMvl_QNKOguuyvn_j1Z8_9NBgatUT7hzL4/pub?output=csv');
    const csvText = await response.text();

    const testimonials = parseCSV(csvText);
    const selected = getRandomFive(testimonials);

    // Assign to named variables
    const [
      firstrow_cardone,
      firstrow_cardtwo,
      firstrow_cardthree,
      secondrow_cardone,
      secondrow_cardtwo
    ] = selected;

    // console.log({
    //   firstrow_cardone,
    //   firstrow_cardtwo,
    //   firstrow_cardthree,
    //   secondrow_cardone,
    //   secondrow_cardtwo
    // });

    // firstrow cardone
    select('#firstrow_cardone').innerHTML = `“${selected[0].message}”`;
    select('#firstrow_cardone_name').innerHTML = selected[0].name;
    select('#firstrow_cardone_rank').innerHTML = selected[0].rank;
    select('#firstrow_cardone_img').src = selected[0].profilePic; 
    
    //firstrow cardtwo
    select('#firstrow_cardtwo').innerHTML = `“${selected[1].message}”`;
    select('#firstrow_cardtwo_name').innerHTML = selected[1].name;
    select('#firstrow_cardtwo_rank').innerHTML = selected[1].rank;
    select('#firstrow_cardtwo_img').src = selected[1].profilePic;

    //firstrow cardthree
    select('#firstrow_cardthree').innerHTML = `“${selected[2].message}”`;
    select('#firstrow_cardthree_name').innerHTML = selected[2].name;
    select('#firstrow_cardthree_rank').innerHTML = selected[2].rank;
    select('#firstrow_cardthree_img').src = selected[2].profilePic;

    // secondrow cardone
    select('#secondrow_cardone').innerHTML = `“${selected[3].message}”`;
    select('#secondrow_cardone_name').innerHTML = selected[3].name;
    select('#secondrow_cardone_rank').innerHTML = selected[3].rank;
    select('#secondrow_cardone_img').src = selected[3].profilePic;

    // secondrow cardtwo
    select('#secondrow_cardtwo').innerHTML = `“${selected[4].message}”`;
    select('#secondrow_cardtwo_name').innerHTML = selected[4].name;
    select('#secondrow_cardtwo_rank').innerHTML = selected[4].rank;
    select('#secondrow_cardtwo_img').src = selected[4].profilePic;
    console.log(secondrow_cardone_img.src);
    



  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
}

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const [, ...dataLines] = lines;

  const testimonials = dataLines.map(line => {
    const parts = line.split(',');
    const profilePic = parts[0]?.trim().replace(/^"|"$/g, '') || '';
    const name = parts[1]?.trim().replace(/^"|"$/g, '') || '';
    const rank = parts[2]?.trim().replace(/^"|"$/g, '') || '';
    const message = parts.slice(3).join(',').trim().replace(/^"|"$/g, '');

    return {
      profilePic: profilePic || placeholderImage,
      name,
      rank,
      message
    };
  });

  return testimonials.filter(t => t.name); // Optionally remove blank rows
}

function getRandomFive(arr) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  if (shuffled.length >= 5) {
    return shuffled.slice(0, 5);
  } else {
    const result = [];
    while (result.length < 5) {
      const randomItem = shuffled[Math.floor(Math.random() * shuffled.length)];
      result.push(randomItem);
    }
    return result;
  }
}

fetchTestimonials();

