// socialLinks.js
export function initSocialLinks() {
  const SOCIAL_LINKS = {
    resume: "/assets/resume.pdf",
    github: "https://github.com/MauroJuliano",
    linkedin: "https://www.linkedin.com/in/mauro-figueiredo-4b7014154/"
  };

  const resumeIcon = document.querySelector('.icon-resume');
  const githubIcon = document.querySelector('.icon-github');
  const linkedinIcon = document.querySelector('.icon-linkedin');

  if (resumeIcon) {
  resumeIcon.href = SOCIAL_LINKS.resume;
  resumeIcon.setAttribute("download", "");
}

  if (githubIcon) githubIcon.href = SOCIAL_LINKS.github;
  if (linkedinIcon) linkedinIcon.href = SOCIAL_LINKS.linkedin;
}
