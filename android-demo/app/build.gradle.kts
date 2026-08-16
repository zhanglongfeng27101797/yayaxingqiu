plugins {
    id("com.android.application")
}

android {
    namespace = "com.yayaplanet.workbench"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.yayaplanet.workbench"
        minSdk = 24
        targetSdk = 35
        versionCode = 12
        versionName = "1.2-demo"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }
}
