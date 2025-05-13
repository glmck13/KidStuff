# KidStuff
Apps for the grandkids, built primarily for use on a Raspberry Pi

## Background
You'll find several subdirectories in this repository.  These reflect a progression of "edutainment" apps I've been writing for the grandkids as I've observed their evolving interests and abilities.  First came "musicpad", a klunky musicplayer running on a headless Pi which the kids could control using a USB keypad.  Next came "pygames", a spelling app built using Python's [pygame](https://www.pygame.org/) library which makes use of Amazon's TTS engine, Polly.  It was at this point I decided to add a 7" LCD touchscreen to the Pi, since the kids had already figured out how to use touchscreen technology from playing with their parent's smartphones (and they were only 2!).  My latest iteration is simply called "piapp", a hodgepodge of FOSS educational apps bundled with an integrated WebRTC softphone.

## Piapp
Here's the current list of apps I have installed:
+ [GCompris](https://www.gcompris.net/): An excellent collection of activities for kids aged 2 and up.
+ [KTuberling](https://apps.kde.org/ktuberling/): A virtual version of "Mr Potato Head".
+ [Tux Paint](https://tuxpaint.org/): A fun paint program for kids.
+ [PBS Kids music games](https://pbskids.org/games/music): A link to the PBS kids music site.  The kids can't seem to get enough of Daniel Tiger!
+ [Chrome music lab](https://musiclab.chromeexperiments.com/): A link to Google's music apps.
+ [Softphone](https://sipjs.com/): A very simple WebRTC client that makes use of the SIP.js library.  My hope is that the kids can eventually figure out how to use this to call one another.  The client connects to my [home PBX](https://pbxmyhome.mckblog.net)

<table>
  <tr>
    <th>GCompris</th>
    <th>KTuberling</th>
    <th>Tux Paint</th>
    <th>PBS Kids</th>
    <th>Musiclab</th>
    <th>Softphone</th>
  </tr>
  <tr>
    <td valign="top">
      <img width=200 src="https://github.com/glmck13/KidStuff/blob/main/gcompris.png">
    </td>
    <td valign="top">
      <img width=200 src="https://github.com/glmck13/KidStuff/blob/main/ktuberling.png">
    </td>
    <td valign="top">
      <img width=200 src="https://github.com/glmck13/KidStuff/blob/main/tuxpaint.png">
    </td>
    <td valign="top">
      <img width=200 src="https://github.com/glmck13/KidStuff/blob/main/pbskids.png">
    </td>
    <td valign="top">
      <img width=200 src="https://github.com/glmck13/KidStuff/blob/main/musiclab.jpg">
    </td>
    <td valign="top">
      <img width=200 src="https://github.com/glmck13/KidStuff/blob/main/phone.png">
    </td>
  </tr>
</table>

## Raspberry Pi hardware
I have things running on both a Raspberry Pi Model 3b and Raspberry Pi 4 running the latest version of Raspberry Pi OS using Wayland.  Each is equipped with a 128GB microSD card I purchased from Walmart. Both systems are configured with a 7" LCD display and a desktop mounting assembly from [Osoyoo](https://osoyoo.com/).  I also include a basic USB speaker/microphone from [Cyber Acoustics](https://www.cyberacoustics.com/) and a USB gamepad from [Retroflag](https://retroflag.com/). Since the systems will be used by little kids, I equipped each of them with a iUniker power supply that has an on/off switch at the USB end. Everything listed here is available on Amazon.  A complete package costs around $200.

"Why the gamepad?" you ask.  Well, I don't think the kids need a full keyboard just yet (which intentionally limits what other apps/sites they can access), but I needed something that could emit a few essential window controls, like enter/exit fullscreen mode, quit, etc.  It's easy to map gamepad buttons to the required keyboard/mouse inputs using [AntiMicroX](https://github.com/AntiMicroX/antimicrox).

Lastly, although you can get everything running on a Model 3b Pi, I really don't recommend it, since I still encounter cracking/popping on USB audio output which isn't present on the Model 4. Based on some Googling, I believe this is related to the Wifi/Bluetooth radios so I disabled the Bluetooth hardware on my 3b by including the following entries in /etc/modprobe.d/raspi-blacklist.conf:
```
blacklist btbcm
blacklist hci_uart
```
## Piapp software
+ Login as pi on your piapp server, and download copies of all the piapp files from this repo into ~/opt/piapp
+ Set the remote port # in mckbridge.sh to a unique value for this system
+ Set the telephone extension # in phone.desktop to a unique value for this system
+ Link files to their appropriate directories on your system:
```
chmod +x ~/opt/piapp/*.sh ~/opt/piapp/*.desktop
mkdir -p ~/bin ~/etc ~/tmp ~/opt/piapp ~/.local/share/antimicrox ~/.config/autostart
ln -s ~/opt/piapp/mckbridge.sh ~/bin/mckbridge.sh
ln -s ~/opt/piapp/gamepad.sh ~/bin/gamepad.sh
ln -s ~/opt/piapp/gamepad.desktop ~/.config/autostart/gFiles found under amepad.desktop
ln -s ~/opt/piapp/gamecontrollerdb.txt ~/.local/share/antimicrox/gamecontrollerdb.txt
ln -s ~/opt/piapp/gamepad.gamecontroller.amgp ~/.local/share/antimicrox/gamepad.gamecontroller.amgp
ln -s ~/opt/piapp/musiclab.desktop ~/.local/share/applications/musiclab.desktop
ln -s ~/opt/piapp/pbs-kids.desktop ~/.local/share/applications/pbs-kids.desktop
ln -s ~/opt/piapp/phone.desktop ~/.local/share/applications/phone.desktop
```

## SSH client config
Each piapp system connects to a host on my local network to enable remote logins.  Here's how:
+ Execute "ssh-keygen -t ecdsa" on the piapp system, and then save its public key in ~/.ssh/authorized_keys on your local host.
+ Manually login from the piapp server to your local host at least once in order to populate an entry in its ~/.ssh/known_hosts.
+ Add the following entry to pi's crontab:
```
@reboot $HOME/bin/mckbridge.sh
```

## Antimicrox
As mentioned above, AntiMicroX is used to map gamepad buttons to keyboard/mouse inputs to effect a handful of window controls.  Here's how to set it up:
+ Follow the [repository's build intrutions](https://github.com/AntiMicroX/antimicrox/blob/master/BUILDING.md) to build an executable directly on your piapp system under ~/opt.  The current release of Raspberry Pi OS uses Qt5, so install those set of package dependencies first.
+ After the build conpletes:
```
mkdir -p ~/.local/bin
cp ~/opt/antimicrox/build/bin/antimicrox ~/.local/bin
```

## GCompris, Ktuberling, Tux Paint
Installation of these packages is pretty straighforward.  In the case of GCompris, the qt5-image-formats-plugins dependency is mistakenly omitted so it needs to be installed manually.  As for ktuberling, I updated the app's launcher so it appears together will all the other apps under the Pi's main Education menu.
```
sudo apt install gcompris-qt qt5-image-formats-plugins ktuberling tuxpaint
sudo sed -i -e "s/^Categories=.*/&Education;/" /usr/share/applications/org.kde.ktuberling.desktop
```

## Softphone
The softphone app is a barebones client for makng WebRTC calls using [SIP.js](https://sipjs.com/).  It connects to a backend VoIP server - e.g. FreePBX/Asterisk as described in [PBX-My-Home](https://github.com/glmck13/PBX-My-Home) - that's configured with a set of WebRTC extensions.  If you are using Asterisk, here are the relevant PJSIP paramters you need to configure for a WebRTC endpoint:
```
transport=0.0.0.0-wss
use_avpf=yes
rtcp_mux=yes
bundle=yes
ice_support=yes
send_connected_line=yes
media_encryption=dtls
dtls_verify=fingerprint
dtls_setup=actpass
dtls_rekey=0
dtls_cert_file=/etc/asterisk/keys/mckspot.crt
dtls_private_key=/etc/asterisk/keys/mckspot.key
```

The client code can be served from any HTTP/HTTPS web server that contains the following files:
+ the contents of the the "phone" folder in this repo
+ [the Picnic CSS stylesheet](https://picnicss.com/)
+ [the SIP.js library]( https://github.com/onsip/SIP.js/releases)
