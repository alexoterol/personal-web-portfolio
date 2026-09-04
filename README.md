# Personal Web Portfolio

## Introduction
Welcome to my personal web portfolio! This is a professional showcase of my skills, projects, and achievements. Designed with modern web technologies, it reflects my passion for creating user-friendly, visually appealing web experiences.

## About
This portfolio is the perfect place to explore the projects I've worked on, the skills I’ve honed, and my journey as a web developer. Whether you're a potential employer, client, or collaborator, this site will give you a glimpse of what I can do.

## Features
- **Sleek and Responsive Design**: Built to look great on any device, from desktops to mobile.
- **Showcase of Projects**: A filterable gallery linking to the repositories behind each project.
- **About & Qualifications**: My background, education, and work experience in one place.
- **Contact Form**: Client-side validated and delivered through EmailJS — no backend required.

## Tech Stack
- **HTML5 / CSS3**: Semantic markup and a Bootstrap 4 theme customized through Sass.
- **JavaScript (jQuery)**: Typed.js for the hero text, Isotope for portfolio filtering, Owl Carousel for testimonials.
- **EmailJS + SweetAlert2**: Contact form delivery and feedback.

## Project Structure
```
index.html          Single page containing every section
css/style.css       Compiled stylesheet loaded by the page
scss/style.scss     Sass source for css/style.css
js/main.js          Navigation, animations, portfolio filter, carousel
js/app.js           Contact form validation and EmailJS delivery
img/                Photos, project screenshots, technology logos
lib/                Third-party front-end libraries
```

## Running Locally
The site is fully static, but it must be served over HTTP: the Content Security Policy
in `index.html` blocks scripts when the page is opened directly from the filesystem.

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

### Rebuilding the CSS
`css/style.css` is compiled from `scss/style.scss` (which imports Bootstrap from `scss/bootstrap`).
Edit the Sass source rather than the compiled file, then recompile:

```bash
sass scss/style.scss css/style.css
```

## Contributing
I'm always open to feedback, ideas, or collaborations! If you have any suggestions or would like to contribute, feel free to fork the repository, open issues, or submit pull requests.

## Credits and License
The layout started from the *FreeFolio* template by [HTML Codex](https://htmlcodex.com) (see `READ-ME.txt`).
Usage terms are described in `LICENSE.txt`.

---

If you like what you see, feel free to connect with me through the contact form or reach out via my social media links. Let’s collaborate!
