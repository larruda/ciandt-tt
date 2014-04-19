# CI&T Time Tracking (mobile) [![Build Status](https://travis-ci.org/larruda/ciandt_tt.svg?branch=develop)](https://travis-ci.org/larruda/ciandt_tt)

**WARNING**:
This is an UNOFFICIAL app built by a CI&T employee.  
Use it at your own risk! Please do *not* complain if your time isn't recorded.

---

Tired of using your desktop browser every morning and evening in order to check in or out in the company because the website is not mobile-friendly? 

Even though checks through your mobile device, typing your username and password everytime is starting to get boring, isn't it?

This app helps you on this every-day task by saving your credentials securely and providing a friendly interface in which you can check in and out easily.

Give it a try!

* Google Play Store: https://play.google.com/store/apps/details?id=com.ciandt.tt
* Apple App Store: *not yet released*

## Changelog 

* 1.2.5
  * Clock now comes from official TT server (legal issues concerning NTP method)
  * Fixed JSON parsing for Android 2.2.x
  * Time is not sent along with the payload anymore. TT back-end handles that now.

* 0.1.4
  * Screen orientation locked to portrait-only.
  * Storage was being twicely encrypted. Fixed!

* 0.1.3
  * Adaptive layout using view-port and percentage units
  * JS poly-fill for CSS view-port units added for Android's less than 4.3.
  * Storage of credentials is now AES-256 encrypted with per-device unique salt.
  * Remember feature fixed.
  * Issue on clock showing wrong time upon app pause/resume fixed.
  * Upgraded Apache Cordova to 3.4

* 0.0.2
  * Clock synchronised against NTP.BR server endpoint.
  
## Known Issues 

* Clock does not syncronizes if network connection is poor
* Clock is fast-forwarded if back button is pressed on some devices
* Viewport units poly-fill does not work sometimes on Android <= 4.3
* "Unexpected Server Response" on Android 2.3.x
* Intermitent time parsing issues on some devices (NaN:NaN:NaN)

## To-Do 

* Test on iOS devices, perform adjustements and publish on Apple App Store
* Fix those issues above!
* Set up a reminder so users can choose their preferred check in/out time (eg.: 8AM-5PM) so the app pushes a nice reminding notification.

## Technology Stack

| Package       | Type       | Version |
|:------------- |:-------------: | :-------: |
| [Cordova](https://cordova.apache.org/)       | platform   | 3.4.0-rc.2 
| [it.mobimentum.phonegapspinnerplugin](https://github.com/mobimentum/phonegap-plugin-loading-spinner)    | cordova plug-in      | - |
| [org.apache.cordova.device](https://github.com/apache/cordova-plugin-device) | cordova plug-in      | - |
| [org.apache.cordova.dialogs](https://github.com/apache/cordova-plugin-dialogs) | cordova plug-in | - |
| [cordova-plugin-network-information](https://github.com/apache/cordova-plugin-network-information) | cordova plug-in | - |
| [uk.co.whiteoctober.cordova.AppVersion](https://github.com/whiteoctober/cordova-plugin-app-version) | cordova plug-in | - |
| [FastClick](https://github.com/ftlabs/fastclick) | JS library | 0.6.11 |
| [StyleFix & PrefixFree](https://github.com/LeaVerou/prefixfree) | JS library | 1.0.3 & 1.0.7 |
| [CryptoJS](https://code.google.com/p/crypto-js/) | JS library | 3.1.2 |

## How to Contribute

This app has been built for two main personal purposes: 1) learn mobile (hybrid) development and 2) improve my own check in/out experience. I can say both goals have been accomplished, thus I'd like to share as much experience as possible.

Please feel free to suggest new features, report bugs and create issues.

Don't be shy, **create your own fork!**

I'll be accepting pull requests and releasing updates on both app stores :)

So this is it... ENJOY!
