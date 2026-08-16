#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
SDK_ROOT="${ANDROID_SDK_ROOT:-$PROJECT_ROOT/.android-sdk}"
BUILD_TOOLS="$SDK_ROOT/build-tools/35.0.0"
ANDROID_JAR="$SDK_ROOT/platforms/android-35/android.jar"
JAVA_ROOT="${JAVA_HOME:-/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home}"
BUILD_ROOT="$(mktemp -d /tmp/yaya-apk-build.XXXXXX)"
OUTPUT_DIR="$PROJECT_ROOT/app/outputs/apk/debug"
OUTPUT_APK="$OUTPUT_DIR/芽芽星球工作台-demo-v1.2.apk"
KEYSTORE="$PROJECT_ROOT/signing/demo.keystore"

trap 'rm -rf "$BUILD_ROOT"' EXIT
mkdir -p "$BUILD_ROOT/compiled" "$BUILD_ROOT/generated" "$BUILD_ROOT/classes" "$BUILD_ROOT/dex" "$OUTPUT_DIR" "$(dirname "$KEYSTORE")"

"$BUILD_TOOLS/aapt2" compile --dir "$PROJECT_ROOT/app/src/main/res" -o "$BUILD_ROOT/compiled/resources.zip"
"$BUILD_TOOLS/aapt2" link \
  -o "$BUILD_ROOT/app-unsigned-unaligned.apk" \
  -I "$ANDROID_JAR" \
  --manifest "$PROJECT_ROOT/app/src/main/AndroidManifest.xml" \
  --java "$BUILD_ROOT/generated" \
  -A "$PROJECT_ROOT/app/src/main/assets" \
  --min-sdk-version 24 \
  --target-sdk-version 35 \
  --version-code 12 \
  --version-name 1.2-demo \
  --auto-add-overlay \
  "$BUILD_ROOT/compiled/resources.zip"

"$JAVA_ROOT/bin/javac" -source 8 -target 8 -classpath "$ANDROID_JAR" -d "$BUILD_ROOT/classes" \
  $(find "$BUILD_ROOT/generated" "$PROJECT_ROOT/app/src/main/java" -name '*.java' -print)
"$BUILD_TOOLS/d8" --lib "$ANDROID_JAR" --min-api 24 --output "$BUILD_ROOT/dex" \
  $(find "$BUILD_ROOT/classes" -name '*.class' -print)
(cd "$BUILD_ROOT/dex" && zip -q -j "$BUILD_ROOT/app-unsigned-unaligned.apk" classes.dex)
"$BUILD_TOOLS/zipalign" -p -f 4 "$BUILD_ROOT/app-unsigned-unaligned.apk" "$BUILD_ROOT/app-aligned.apk"

if [[ ! -f "$KEYSTORE" ]]; then
  "$JAVA_ROOT/bin/keytool" -genkeypair -keystore "$KEYSTORE" -storepass android \
    -alias androiddebugkey -keypass android -dname 'CN=Yaya Planet Demo,O=Yaya Planet,C=CN' \
    -keyalg RSA -keysize 2048 -validity 10000 >/dev/null 2>&1
fi

"$BUILD_TOOLS/apksigner" sign --ks "$KEYSTORE" --ks-pass pass:android --key-pass pass:android \
  --out "$OUTPUT_APK" "$BUILD_ROOT/app-aligned.apk"
"$BUILD_TOOLS/apksigner" verify --verbose "$OUTPUT_APK"
echo "$OUTPUT_APK"
