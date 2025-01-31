module.exports = {
    transform: {
        "\\.ts$": "ts-jest",
        "\\.js$": "babel-jest",
        "\\.tmx$": "<rootDir>/node_modules/@rpgjs/compiler/tmx-loader/index.js",
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg)$": "<rootDir>/node_modules/@rpgjs/compiler/jest/image.js",
        "\\.(mp4|webm|wav|mp3|m4a|aac|oga|ogg)$": "<rootDir>/node_modules/@rpgjs/compiler/jest/file.js",
        "\\.vue$": "@vue/vue3-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(@?rpgjs.+)/)/",
        "/@rpgjs/server/"
    ],
    moduleFileExtensions: [
        "ts",
        "js",
        "vue",
        "json"
    ],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    "testEnvironmentOptions": { "resources": "usable" },
    moduleDirectories: [
        ".",
        "src",
        "node_modules"
    ],
    setupFiles: ["<rootDir>/node_modules/@rpgjs/compiler/jest/setup.js"],
    moduleNameMapper: {
        '^server!(.*)$': '$1',
        '^mmorpg!(.*)$': '$1',
        '^rpg!(.*)$': '$1',
        '^development!(.*)$': '$1',
        '^production!(.*)$': '$1',
        '^client!(.*)$': '$1'
    }
}