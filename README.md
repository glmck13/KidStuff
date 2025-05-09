# KidStuff
Apps for the grandkids, built primarily for use on a Raspberry Pi.  You'll find several subdirectories in this repository.  These reflect a progression of "edutainment" apps I've been writing for the grandkids as I've observed their evolving interests and abilities.  First came "musicpad", a klunky musicplayer running on a headless Pi which the kids could control using a USB keypad.  Next came "pygames", a spelling app integrated with Amazon's TTS engine, Polly.  It was at this point I decided to add a 7" LCD touchscreen to the Pi, since the kids had already figured out how to use touchscreen technology from playing with their parent's smartphones (and they were only 2!).  My latest iteration I'm calling "piapp", a hodgepodge of FOSS educational apps bundled with an integrated WebRTC SoftPhone.

# Piapp
Here's the current list of apps I have installed:
+ [GCompris](https://www.gcompris.net/): An excellent collection of activities for kids aged 2 and up.
+ [KTuberling](https://apps.kde.org/ktuberling/): A virtual version of "Mr Potato Head".
+ [Tux Paint](https://tuxpaint.org/): A fun paint program for kids.
+ [PBS kids music games](https://pbskids.org/games/music): A link to the PBS kids music site.  The kids can't seem to get enough of Daniel Tiger!
+ [Chrome music lab](https://musiclab.chromeexperiments.com/): A link to Google's music apps.
+ [SIP.js phone](https://sipjs.com/): A very simple WebRTC client that makes use of the SIP.js library.  My hope is that the kids can eventually figure out how to use this to call one another.  The client connects to my [home PBX](https://pbxmyhome.mckblog.net)

# Raspberry Pi hardware
I have things running on both a Raspberry Pi Model 3b and Raspberry Pi 4 running the latest version of Raspberry Pi OS using Wayland.  Each is equipped with a 128GB microSD card I purchased from Walmart. Both systems are configured with a 7" LCD display and a desktop mounting assembly from [Osoyoo](https://osoyoo.com/).  I also include a basic USB speaker/microphone from [Cyber Acoustics](https://www.cyberacoustics.com/) and a USB gamepad from [Retroflag](https://retroflag.com/). Since the systems will be used by little kids, I also purchased iUniker power supplies with integrated on/off switches. Everything is available on Amazon.  A complete package will cost about $200.

"Why the gamepad?" you ask.  Well, I don't think the kids need a full keyboard just yet (which intentionally limits what other apps/sites they can accees), but I needed something that could input a few essential keyboard/mouse inputs to operate window controls, e.g. enter/exit fullscreen mode, quit, etc.  I'm using [AntiMicroX](https://github.com/AntiMicroX/antimicrox) to map gamepad buttons to the required keyboard/mouse inputs.

Lastly, although you can get everything running on a Model 3b Pi, I don't recommend it, since I still encounter cracking/popping on the sound interface which isn't present on the Model 4. I believe this is related to the Wifi/Bluetooth radios, so I do have Bluetooth disabled by specifying the following in /etc/modprobe.d/raspi-blacklist.conf:
```
blacklist btbcm
blacklist hci_uart
```
