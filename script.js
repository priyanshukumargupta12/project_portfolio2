document.addEventListener("DOMContentLoaded", function () {
  const words = ["Web Developer", "Web Designer", "Frontend Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = '';
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newWordDelay = 2000;

  function type() {
      if (charIndex < words[wordIndex].length) {
          currentWord += words[wordIndex].charAt(charIndex);
          document.querySelector('.typing-animation').textContent = currentWord;
          charIndex++;
          setTimeout(type, typingSpeed);
      } else {
          setTimeout(erase, newWordDelay);
      }
  }

  function erase() {
      if (charIndex > 0) {
          currentWord = currentWord.slice(0, -1);
          document.querySelector('.typing-animation').textContent = currentWord;
          charIndex--;
          setTimeout(erase, erasingSpeed);
      } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, typingSpeed + 1100);
      }
  }

  type();
});



// Animate progress bars
const progressBars = document.querySelectorAll('.progress-done');

progressBars.forEach(bar => {
    setTimeout(() => {
        bar.style.width = bar.getAttribute('data-done') + '%';
        bar.style.opacity = 1;
    }, 500);
});

// Animate circular skills
const circles = document.querySelectorAll('.circle');

circles.forEach(circle => {
    let percent = circle.getAttribute('data-percent');
    circle.style.setProperty('--percent', percent);
});
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const links = document.querySelectorAll('nav ul li a');

    // Toggle navigation on mobile
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu after click
            if (navList.classList.contains('show')) {
                navList.classList.remove('show');
            }
        });
    });
});
/*othercode*/
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});


// Select all menu items
const menuItems = document.querySelectorAll('.navbar');

// Loop through each menu item and add event listeners for hover
menuItems.forEach(item => {
    // On mouse enter (hover)
    item.addEventListener('mouseenter', () => {
        item.classList.add('hovered');
    });

    // On mouse leave (hover out)
    item.addEventListener('mouseleave', () => {
        item.classList.remove('hovered');
    });
});
/* For logo */
window.onload = function() {
    const logo = document.getElementById('logo');

    // Bouncing animation
    logo.style.transform = 'translateY(0)';
    setTimeout(() => {
        logo.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            logo.style.transform = 'translateY(0)';
        }, 300);
    }, 100);
};
// For Video Introducton
window.onload = function() {
    const description = document.getElementById('description');
    const video = document.getElementById('intro-video');

    video.addEventListener('loadeddata', () => {
        description.classList.add('show');
    });

    video.addEventListener('ended', () => {
        description.classList.remove('show');
    });
};
//  Dark and light mode
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    themeIcon.src = currentTheme === 'dark' ? 'moon-icon.png' : 'sun-icon.png';
}

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    const isDarkTheme = document.body.classList.contains('dark-theme');
    themeIcon.src = isDarkTheme ? 'moon-icon.png' : 'sun-icon.png';

    // Save the theme preference in localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
});
// Blog Post 
// script.js
document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    
    const post = {
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    };

    addPostToList(post);
    clearForm();
});

function addPostToList(post) {
    const postList = document.getElementById('postList');
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <span>${post.date}</span>
    `;
    
    postList.prepend(postDiv);
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
}
// // blog.js
// document.addEventListener('DOMContentLoaded', function() {
//     const postForm = document.getElementById('postForm');
//     const postList = document.getElementById('postList');

//     // Load existing posts
//     loadPosts();

//     // Handle form submission
//     postForm.addEventListener('submit', async function(e) {
//         e.preventDefault();

//         const formData = new FormData(postForm);

//         try {
//             const response = await fetch('add_post.php', {
//                 method: 'POST',
//                 body: formData
//             });

//             const data = await response.json();

//             if (data.success) {
//                 alert('Post added successfully!');
//                 postForm.reset();
//                 loadPosts();
//             } else {
//                 alert('Error adding post: ' + data.message);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred while adding the post');
//         }
//     });

//     // Function to load posts
//     async function loadPosts() {
//         try {
//             const response = await fetch('get_posts.php');
//             const data = await response.json();

//             if (data.success) {
//                 postList.innerHTML = data.posts.map(post => `
//                     <div class="post">
//                         <h2>${escapeHtml(post.title)}</h2>
//                         <div class="post-meta">
//                             <span>By ${escapeHtml(post.author)}</span>
//                             <span>・</span>
//                             <span>${new Date(post.created_at).toLocaleDateString()}</span>
//                         </div>
//                         <div class="post-content">
//                             ${escapeHtml(post.content)}
//                         </div>
//                     </div>
//                 `).join('');
//             } else {
//                 alert('Error loading posts: ' + data.message);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred while loading posts');
//         }
//     }

//     // Helper function to escape HTML
//     function escapeHtml(unsafe) {
//         return unsafe
//             .replace(/&/g, "&amp;")
//             .replace(/</g, "&lt;")
//             .replace(/>/g, "&gt;")
//             .replace(/"/g, "&quot;")
//             .replace(/'/g, "&#039;");
//     }
// });
// Enhanced createPost function
async function createPost(event) {
    event.preventDefault();

    const title = document.getElementById('postTitle').value.trim();
    const author = document.getElementById('postAuthor').value.trim();
    const content = document.getElementById('postContent').value.trim();

    // Validate input
    if (!title || !author || !content) {
        alert('Please fill in all fields');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content);

    try {
        const response = await fetch('add_post.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            closeCreatePostModal();
            await loadBlogPosts();
            alert('Post created successfully!');
        } else {
            throw new Error(data.message || 'Error creating post');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error creating post: ${error.message}`);
    }
}

// Enhanced loadBlogPosts function
async function loadBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    blogPostsContainer.innerHTML = '<p>Loading posts...</p>';

    try {
        const response = await fetch('get_posts.php');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            if (data.posts.length === 0) {
                blogPostsContainer.innerHTML = '<p>No posts found.</p>';
                return;
            }

            blogPostsContainer.innerHTML = data.posts.map(post => `
                <div class="blog-post">
                    <h2 class="blog-title">${escapeHtml(post.title)}</h2>
                    <div class="blog-meta">
                        <span>By ${escapeHtml(post.author)}</span>
                        <span> • </span>
                        <span>${new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div class="blog-content">
                        ${escapeHtml(post.content)}
                    </div>
                </div>
            `).join('');
        } else {
            throw new Error(data.message || 'Error loading posts');
        }
    } catch (error) {
        console.error('Error:', error);
        blogPostsContainer.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
    }
}