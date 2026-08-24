// Arquivo: language.js

export function initLanguageSelector(options) {
    const {
        defaultLang = "en",
        onLanguageChange = null,
        jsonPath = "./",        // caminho onde ficam seus hero-data-PT.json e hero-data-EN.json
        elementsToUpdate = {}   // mapeamento: idDoElemento → chaveDoJSON
    } = options;

    const languageButtons = [...document.querySelectorAll(".lang-selector [data-lang]")];
    const supportedLanguages = new Map(
        languageButtons.map(button => [button.dataset.lang.toLowerCase(), button])
    );

    if (!supportedLanguages.size) return;

    // ---- 1. Carrega idioma do localStorage ou usa default ----
    const savedLang = localStorage.getItem("lang") || defaultLang;
    const fallbackLang = supportedLanguages.has(defaultLang)
        ? defaultLang
        : supportedLanguages.keys().next().value;
    const initialLang = supportedLanguages.has(savedLang) ? savedLang : fallbackLang;
    setActiveLanguage(initialLang);

    // ---- 2. Função para carregar o JSON ----
    async function loadLanguageFile(lang) {
        const file = `${jsonPath}hero-data-${lang.toUpperCase()}.json`;

        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            // Atualiza textos
            Object.keys(elementsToUpdate).forEach(id => {
                const element = document.getElementById(id);
                const key = elementsToUpdate[id];
                const value = getNestedValue(data, key);
                if (element && value !== undefined) {
                    element.textContent = value;
                }
            });

            if (onLanguageChange) onLanguageChange(lang, data);
        } catch (error) {
            console.error("Erro ao carregar JSON de idioma:", error);
        }
    }

    // ---- 3. Cada botão funciona de forma independente ----
    languageButtons.forEach(button => {
        button.addEventListener("click", () => changeLang(button.dataset.lang.toLowerCase()));
    });
    

    function changeLang(lang) {
        if (!supportedLanguages.has(lang)) return;
        localStorage.setItem("lang", lang);
        setActiveLanguage(lang);
        loadLanguageFile(lang);
    }

    function setActiveLanguage(lang) {
        languageButtons.forEach(button => {
            button.setAttribute("aria-pressed", String(button.dataset.lang.toLowerCase() === lang));
        });
    }

    function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

    // ---- 4. Carrega o idioma logo na inicialização ----
    loadLanguageFile(initialLang);
}
