Java.perform(function () {
    console.log('[+] Starting Root Detection and SSL Pinning Bypass');

    // Root Detection Bypass
    try {
        var RootPackages = [
            'com.noshufou.android.su',
            'eu.chainfire.supersu',
            'com.koushikdutta.superuser',
            'com.zachspong.temprootremovejb',
            'com.ramdroid.appquarantine',
            'com.topjohnwu.magisk'
        ];

        var PackageManager = Java.use('android.app.ApplicationPackageManager');
        PackageManager.getPackageInfo.implementation = function (pkg, flags) {
            if (RootPackages.indexOf(pkg) >= 0) {
                console.log('[+] Bypassing root detection for package: ' + pkg);
                throw new Error('Package not found'); // Simulate package not found
            }
            return this.getPackageInfo(pkg, flags);
        };
        console.log('[+] Root Detection Bypass Successful');
    } catch (e) {
        console.log('[-] Root Detection Bypass Error: ' + e);
    }

    // SSL Pinning Bypass
    try {
        var CertificatePinner = Java.use('okhttp3.CertificatePinner');

        // Override both common overloads to bypass SSL Pinning
        CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function (hostname, peerCertificates) {
            console.log('[+] Bypassing SSL Pinning for host: ' + hostname);
            return;  // Bypass SSL pinning
        };

        CertificatePinner.check.overload('java.lang.String', 'java.security.cert.Certificate').implementation = function (hostname, certificate) {
            console.log('[+] Bypassing SSL Pinning for host: ' + hostname);
            return;  // Bypass SSL pinning
        };

        console.log('[+] SSL Pinning Bypass Successful');
    } catch (e) {
        console.log('[-] SSL Pinning Bypass Error: ' + e);
    }
});
