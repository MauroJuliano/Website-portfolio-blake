// Arquivo: language.js

export function initLanguageSelector(options) {
    const {
        defaultLang = "pt",
        onLanguageChange = null,
        jsonPath = "./",        // caminho onde ficam seus hero-data-PT.json e hero-data-EN.json
        elementsToUpdate = {}   // mapeamento: idDoElemento → chaveDoJSON
    } = options;

    const langRadios = {
        pt: document.getElementById("pt"),
        en: document.getElementById("en")
    };

    // ---- 1. Carrega idioma do localStorage ou usa default ----
    const savedLang = localStorage.getItem("lang") || defaultLang;
    langRadios[savedLang].checked = true;

    // ---- 2. Função para carregar o JSON ----
    async function loadLanguageFile(lang) {
        const file = `${jsonPath}hero-data-${lang.toUpperCase()}.json`;

        try {
            const response = await fetch(file);
            const data = await response.json();

            // Atualiza textos
            Object.keys(elementsToUpdate).forEach(id => {
                const element = document.getElementById(id);
                const key = elementsToUpdate[id];

                if (element && data[key]) {
                    element.textContent = data[key];
                }
            });

            if (onLanguageChange) onLanguageChange(lang, data);
        } catch (error) {
            console.error("Erro ao carregar JSON de idioma:", error);
        }
    }

    // ---- 3. Listener de mudança (PT/EN) ----
    langRadios.pt.addEventListener("change", () => changeLang("pt"));
    langRadios.en.addEventListener("change", () => changeLang("en"));

    function changeLang(lang) {
        localStorage.setItem("lang", lang);
        loadLanguageFile(lang);
    }

    // ---- 4. Carrega o idioma logo na inicialização ----
    loadLanguageFile(savedLang);
}
