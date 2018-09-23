const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            '6Lf92m0UAAAAABswFv5e-UHWHVk5TmAVipfULWg6',
            '6Lf92m0UAAAAAJ1XocLvFTLRw1VYPysiT-TBrB8-' , 
            { hl : 'fa' }
        );
    }

    recaptchaValidation(req , res) {
        return new Promise((resolve , reject) => {
            this.recaptcha.verify(req , (err , data) => {
                if(err) {
                    req.flash('errors' , 'گزینه امنیتی مربوط به شناسایی روبات خاموش است، لطفا از فعال بودن آن اطمینان حاصل نمایید و مجدد امتحان کنید');
                    res.redirect(req.url);
                } else resolve(true);
            })
        })
    }
}