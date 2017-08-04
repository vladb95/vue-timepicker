// rollup.config.js
import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";
import scss from "rollup-plugin-scss";
import commonjs from "rollup-plugin-commonjs";
import { minify } from "uglify-es";

export default {
    entry: "src/index.js",
    dest: "dist/vue-timepicker.js",
    plugins: [
        vue({
            styleToImports: true
        }),
        scss({
            output: false
        }),
        // buble(),
        // uglify({}, minify)
    ]
};
