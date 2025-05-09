# KidStuff
Apps for the grandkids, built primarily for use on a Raspberry Pi

## Background
You'll find several subdirectories in this repository.  These reflect a progression of "edutainment" apps I've been writing for the grandkids as I've observed their evolving interests and abilities.  First came "musicpad", a klunky musicplayer running on a headless Pi which the kids could control using a USB keypad.  Next came "pygames", a spelling app built using Python's [pygame](https://www.pygame.org/) library which makes use of Amazon's TTS engine, Polly.  It was at this point I decided to add a 7" LCD touchscreen to the Pi, since the kids had already figured out how to use touchscreen technology from playing with their parent's smartphones (and they were only 2!).  My latest iteration I'm calling "piapp", a hodgepodge of FOSS educational apps bundled with an integrated WebRTC SoftPhone.

## Piapp
Here's the current list of apps I have installed:
+ [GCompris](https://www.gcompris.net/): An excellent collection of activities for kids aged 2 and up.
+ [KTuberling](https://apps.kde.org/ktuberling/): A virtual version of "Mr Potato Head".
+ [Tux Paint](https://tuxpaint.org/): A fun paint program for kids.
+ [PBS kids music games](https://pbskids.org/games/music): A link to the PBS kids music site.  The kids can't seem to get enough of Daniel Tiger!
+ [Chrome music lab](https://musiclab.chromeexperiments.com/): A link to Google's music apps.
+ [SIP.js phone](https://sipjs.com/): A very simple WebRTC client that makes use of the SIP.js library.  My hope is that the kids can eventually figure out how to use this to call one another.  The client connects to my [home PBX](https://pbxmyhome.mckblog.net)

## Raspberry Pi hardware
I have things running on both a Raspberry Pi Model 3b and Raspberry Pi 4 running the latest version of Raspberry Pi OS using Wayland.  Each is equipped with a 128GB microSD card I purchased from Walmart. Both systems are configured with a 7" LCD display and a desktop mounting assembly from [Osoyoo](https://osoyoo.com/).  I also include a basic USB speaker/microphone from [Cyber Acoustics](https://www.cyberacoustics.com/) and a USB gamepad from [Retroflag](https://retroflag.com/). Since the systems will be used by little kids, I equipped each of them with a iUniker power supply that has an on/off switch at the USB end. Everything listed here is available on Amazon.  A complete package costs around $200.

"Why the gamepad?" you ask.  Well, I don't think the kids need a full keyboard just yet (which intentionally limits what other apps/sites they can accees), but I needed something that could emit a few essential window controls, like enter/exit fullscreen mode, quit, etc.  It's easy to map gamepad buttons to the required keyboard/mouse inputs using [AntiMicroX](https://github.com/AntiMicroX/antimicrox).

Lastly, although you can get everything running on a Model 3b Pi, I really don't recommend it, since I still encounter cracking/popping on USB audio output which isn't present on the Model 4. Based on some Googling, I believe this is related to the Wifi/Bluetooth radios so I disabled the Bluetooth hardware on my 3b by including the following entries in /etc/modprobe.d/raspi-blacklist.conf:
```
blacklist btbcm
blacklist hci_uart
```
## SSH client config
Each piapp system connects to a host on the local network to enable remote logins.  Here's how:
+ Execute "ssh-keygen -t ecdsa" on the piapp system, and then save its public key in ~/.ssh/authorized_keys on your local host.
+ Manually login from the piapp server to your local host at least once in order to populate an entry in its ~/.ssh/known_hosts.
+ Update the remote port # in mckbridge.sh, then add the following entry to pi's crontab:
```
@reboot $HOME/bin/mckbridge.sh
```
