import i18n from "i18next"
import cn from "./cn"
import en from "./en"
import vn from "./vn"
const resources={
    cn,en,vn
};

i18n.init({
    resources,
    fallbackLng:'en',
    debug:true,
    interpolation:{
        escapeValue:false
    }
});

export default i18n;