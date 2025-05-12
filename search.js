// Search data structure containing all searchable content
const searchData = [
    {
        title: "Home",
        url: "#home",
        description: "Welcome to Drone Dio - University of Wollongong's Premier Drone Team"
    },
    {
        title: "About Us",
        url: "#about",
        description: "Learn about Drone Dio's mission and vision"
    },
    {
        title: "Team Members",
        url: "#team",
        description: "Meet our executive team and members"
    },
    {
        title: "Events",
        url: "#events",
        description: "Upcoming events and workshops"
    },
    {
        title: "Gallery",
        url: "#gallery",
        description: "View our workshop moments and drone photos"
    },
    {
        title: "Sponsors",
        url: "#sponsors",
        description: "Our valued sponsors and partners"
    },
    {
        title: "Contact",
        url: "#contact",
        description: "Get in touch with Drone Dio"
    },
    {
        title: "Blog",
        url: "blog.html",
        description: "Read our latest updates and news"
    }
];

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Add event listener for search input
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        // Search across all pages
        const results = [];
        
        // Search through each page's content
        for (const [page, pageData] of Object.entries(searchableContent)) {
            // Search in page title
            if (pageData.title.toLowerCase().includes(query)) {
                results.push({
                    title: pageData.title,
                    url: page,
                    description: 'Page title match'
                });
            }

            // Search in sections
            pageData.sections.forEach(section => {
                if (section.title.toLowerCase().includes(query) || 
                    section.content.toLowerCase().includes(query)) {
                    results.push({
                        title: section.title,
                        url: page + section.url,
                        description: section.content.substring(0, 100) + '...'
                    });
                }
            });
        }

        // Display results
        displayResults(results);
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
});

// Function to display search results
function displayResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="window.location.href='${result.url}'">
                <h4>${result.title}</h4>
                <p>${result.description}</p>
            </div>
        `).join('');
    }
    
    searchResults.classList.add('active');
} 