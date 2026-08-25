const RESUME_BY_LANGUAGE = {
  en: {
    href: "assets/documents/resume-en.pdf",
    filename: "Mauro-Figueiredo-Resume-EN.pdf"
  },
  pt: {
    href: "assets/documents/resume-ptbr.pdf",
    filename: "Mauro-Figueiredo-Curriculo-PTBR.pdf"
  }
};

export function updateResumeLink(language = "en") {
  const resumeIcon = document.querySelector('.icon-resume');
  if (!resumeIcon) return;

  const resume = RESUME_BY_LANGUAGE[language] || RESUME_BY_LANGUAGE.en;
  resumeIcon.href = resume.href;
  resumeIcon.setAttribute("download", resume.filename);
}

export function initSocialLinks() {
  const SOCIAL_LINKS = {
    github: "https://github.com/MauroJuliano",
    linkedin: "https://www.linkedin.com/in/mauro-figueiredo-4b7014154/"
  };

  const githubIcon = document.querySelector('.icon-github');
  const linkedinIcon = document.querySelector('.icon-linkedin');

  updateResumeLink(localStorage.getItem("lang") || "en");

  if (githubIcon) githubIcon.href = SOCIAL_LINKS.github;
  if (linkedinIcon) linkedinIcon.href = SOCIAL_LINKS.linkedin;
}
