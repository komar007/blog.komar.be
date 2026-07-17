// Cloudflare Pages Functions — _middleware.js
// Handles WordPress ?p=N and ?page_id=N shortlinks.
// _redirects can't match query strings, so this function covers them.
//
// Every known ID returns a 301 to komar.blog. Unknown IDs → home.
// Attachment IDs redirect to the parent post.

// Combined ID → komar.blog path (posts, pages, attachments — all resolved the same way)
const ID_MAP = {

  // ── 9999-in-1-reloaded-part-1 ──
  6:   '/posts/9999-in-1-reloaded-part-1',
  44:  '/posts/9999-in-1-reloaded-part-1',
  50:  '/posts/9999-in-1-reloaded-part-1',
  51:  '/posts/9999-in-1-reloaded-part-1',
  52:  '/posts/9999-in-1-reloaded-part-1',
  53:  '/posts/9999-in-1-reloaded-part-1',
  54:  '/posts/9999-in-1-reloaded-part-1',
  56:  '/posts/9999-in-1-reloaded-part-1',
  60:  '/posts/9999-in-1-reloaded-part-1',
  68:  '/posts/9999-in-1-reloaded-part-1',
  70:  '/posts/9999-in-1-reloaded-part-1',
  71:  '/posts/9999-in-1-reloaded-part-1',
  88:  '/posts/9999-in-1-reloaded-part-1',
  90:  '/posts/9999-in-1-reloaded-part-1',

  // ── 9999-in-1-reloaded-part-2 ──
  110: '/posts/9999-in-1-reloaded-part-2',
  111: '/posts/9999-in-1-reloaded-part-2',
  112: '/posts/9999-in-1-reloaded-part-2',
  130: '/posts/9999-in-1-reloaded-part-2',
  133: '/posts/9999-in-1-reloaded-part-2',
  136: '/posts/9999-in-1-reloaded-part-2',
  139: '/posts/9999-in-1-reloaded-part-2',
  140: '/posts/9999-in-1-reloaded-part-2',
  145: '/posts/9999-in-1-reloaded-part-2',
  148: '/posts/9999-in-1-reloaded-part-2',

  // ── wang-724-teardown ──
  166: '/posts/wang-724-teardown',
  169: '/posts/wang-724-teardown',
  197: '/posts/wang-724-teardown',
  198: '/posts/wang-724-teardown',
  201: '/posts/wang-724-teardown',
  204: '/posts/wang-724-teardown',
  207: '/posts/wang-724-teardown',
  217: '/posts/wang-724-teardown',
  218: '/posts/wang-724-teardown',
  219: '/posts/wang-724-teardown',
  221: '/posts/wang-724-teardown',
  223: '/posts/wang-724-teardown',
  226: '/posts/wang-724-teardown',
  227: '/posts/wang-724-teardown',
  235: '/posts/wang-724-teardown',
  241: '/posts/wang-724-teardown',
  242: '/posts/wang-724-teardown',
  245: '/posts/wang-724-teardown',
  246: '/posts/wang-724-teardown',
  247: '/posts/wang-724-teardown',
  248: '/posts/wang-724-teardown',
  249: '/posts/wang-724-teardown',
  250: '/posts/wang-724-teardown',
  261: '/posts/wang-724-teardown',
  262: '/posts/wang-724-teardown',

  // ── introducing-the-gh60-keyboard-project ──
  267: '/posts/introducing-the-gh60-keyboard-project',
  416: '/posts/introducing-the-gh60-keyboard-project',
  453: '/posts/introducing-the-gh60-keyboard-project',
  459: '/posts/introducing-the-gh60-keyboard-project',
  461: '/posts/introducing-the-gh60-keyboard-project',
  474: '/posts/introducing-the-gh60-keyboard-project',

  // ── my-way-of-handling-pdfs-in-xmonad ──
  271: '/posts/my-way-of-handling-pdfs-in-xmonad',
  400: '/posts/my-way-of-handling-pdfs-in-xmonad',
  401: '/posts/my-way-of-handling-pdfs-in-xmonad',

  // ── using-atmels-dfu-bootloader-abi-on-atmega32u4-in-avr-gcc ──
  325: '/posts/using-atmels-dfu-bootloader-abi-on-atmega32u4-in-avr-gcc',
  373: '/posts/using-atmels-dfu-bootloader-abi-on-atmega32u4-in-avr-gcc',
  374: '/posts/using-atmels-dfu-bootloader-abi-on-atmega32u4-in-avr-gcc',
  394: '/posts/using-atmels-dfu-bootloader-abi-on-atmega32u4-in-avr-gcc',
  409: '/posts/using-atmels-dfu-bootloader-abi-on-atmega32u4-in-avr-gcc',

  // ── logged-in-through-ssh ──
  543: '/posts/logged-in-through-ssh',
  547: '/posts/logged-in-through-ssh',
  1028:'/posts/logged-in-through-ssh',

  // ── making-pcb-artwork-in-kicad ──
  557: '/posts/making-pcb-artwork-in-kicad',
  558: '/posts/making-pcb-artwork-in-kicad',
  560: '/posts/making-pcb-artwork-in-kicad',
  561: '/posts/making-pcb-artwork-in-kicad',
  574: '/posts/making-pcb-artwork-in-kicad',
  577: '/posts/making-pcb-artwork-in-kicad',
  592: '/posts/making-pcb-artwork-in-kicad',
  601: '/posts/making-pcb-artwork-in-kicad',
  602: '/posts/making-pcb-artwork-in-kicad',
  606: '/posts/making-pcb-artwork-in-kicad',
  614: '/posts/making-pcb-artwork-in-kicad',
  616: '/posts/making-pcb-artwork-in-kicad',
  626: '/posts/making-pcb-artwork-in-kicad',
  973: '/posts/making-pcb-artwork-in-kicad',
  1023:'/posts/making-pcb-artwork-in-kicad',

  // ── making-my-own-pendrive-kind-of ──
  635: '/posts/making-my-own-pendrive-kind-of',
  636: '/posts/making-my-own-pendrive-kind-of',
  637: '/posts/making-my-own-pendrive-kind-of',
  638: '/posts/making-my-own-pendrive-kind-of',
  639: '/posts/making-my-own-pendrive-kind-of',
  646: '/posts/making-my-own-pendrive-kind-of',
  647: '/posts/making-my-own-pendrive-kind-of',
  648: '/posts/making-my-own-pendrive-kind-of',
  649: '/posts/making-my-own-pendrive-kind-of',
  652: '/posts/making-my-own-pendrive-kind-of',
  653: '/posts/making-my-own-pendrive-kind-of',
  668: '/posts/making-my-own-pendrive-kind-of',
  669: '/posts/making-my-own-pendrive-kind-of',
  670: '/posts/making-my-own-pendrive-kind-of',
  671: '/posts/making-my-own-pendrive-kind-of',
  672: '/posts/making-my-own-pendrive-kind-of',
  673: '/posts/making-my-own-pendrive-kind-of',
  674: '/posts/making-my-own-pendrive-kind-of',
  675: '/posts/making-my-own-pendrive-kind-of',
  684: '/posts/making-my-own-pendrive-kind-of',
  1020:'/posts/making-my-own-pendrive-kind-of',

  // ── gh60-evolution ──
  695: '/posts/gh60-evolution',
  701: '/posts/gh60-evolution',
  702: '/posts/gh60-evolution',
  714: '/posts/gh60-evolution',
  716: '/posts/gh60-evolution',
  720: '/posts/gh60-evolution',
  727: '/posts/gh60-evolution',
  738: '/posts/gh60-evolution',
  745: '/posts/gh60-evolution',
  746: '/posts/gh60-evolution',
  749: '/posts/gh60-evolution',
  750: '/posts/gh60-evolution',
  1021:'/posts/gh60-evolution',

  // ── how-to-make-a-keyboard-the-matrix ──
  764: '/posts/how-to-make-a-keyboard-the-matrix',
  777: '/posts/how-to-make-a-keyboard-the-matrix',
  783: '/posts/how-to-make-a-keyboard-the-matrix',
  801: '/posts/how-to-make-a-keyboard-the-matrix',
  809: '/posts/how-to-make-a-keyboard-the-matrix',
  814: '/posts/how-to-make-a-keyboard-the-matrix',
  818: '/posts/how-to-make-a-keyboard-the-matrix',
  825: '/posts/how-to-make-a-keyboard-the-matrix',
  843: '/posts/how-to-make-a-keyboard-the-matrix',
  1019:'/posts/how-to-make-a-keyboard-the-matrix',

  // ── burning-ship ──
  846: '/posts/burning-ship',
  870: '/posts/burning-ship',
  871: '/posts/burning-ship',
  873: '/posts/burning-ship',
  876: '/posts/burning-ship',
  882: '/posts/burning-ship',
  883: '/posts/burning-ship',
  885: '/posts/burning-ship',
  886: '/posts/burning-ship',
  887: '/posts/burning-ship',
  888: '/posts/burning-ship',
  924: '/posts/burning-ship',
  925: '/posts/burning-ship',
  926: '/posts/burning-ship',
  927: '/posts/burning-ship',
  928: '/posts/burning-ship',
  929: '/posts/burning-ship',
  930: '/posts/burning-ship',
  931: '/posts/burning-ship',
  932: '/posts/burning-ship',
  933: '/posts/burning-ship',
  934: '/posts/burning-ship',
  935: '/posts/burning-ship',
  936: '/posts/burning-ship',
  937: '/posts/burning-ship',
  938: '/posts/burning-ship',
  939: '/posts/burning-ship',
  955: '/posts/burning-ship',
  1026:'/posts/burning-ship',
  1223:'/posts/burning-ship',

  // ── led-strip-dimmer-and-potting-attempt ──
  1040:'/posts/led-strip-dimmer-and-potting-attempt',
  1059:'/posts/led-strip-dimmer-and-potting-attempt',
  1066:'/posts/led-strip-dimmer-and-potting-attempt',
  1067:'/posts/led-strip-dimmer-and-potting-attempt',
  1074:'/posts/led-strip-dimmer-and-potting-attempt',
  1075:'/posts/led-strip-dimmer-and-potting-attempt',
  1079:'/posts/led-strip-dimmer-and-potting-attempt',
  1080:'/posts/led-strip-dimmer-and-potting-attempt',
  1082:'/posts/led-strip-dimmer-and-potting-attempt',
  1083:'/posts/led-strip-dimmer-and-potting-attempt',
  1084:'/posts/led-strip-dimmer-and-potting-attempt',
  1085:'/posts/led-strip-dimmer-and-potting-attempt',
  1087:'/posts/led-strip-dimmer-and-potting-attempt',
  1088:'/posts/led-strip-dimmer-and-potting-attempt',
  1089:'/posts/led-strip-dimmer-and-potting-attempt',
  1090:'/posts/led-strip-dimmer-and-potting-attempt',
  1093:'/posts/led-strip-dimmer-and-potting-attempt',
  1094:'/posts/led-strip-dimmer-and-potting-attempt',
  1110:'/posts/led-strip-dimmer-and-potting-attempt',

  // ── 60-cherry-mx-8100-mod ──
  1142:'/posts/cherry-g80-8100-60-percent-keyboard',
  1145:'/posts/cherry-g80-8100-60-percent-keyboard',
  1146:'/posts/cherry-g80-8100-60-percent-keyboard',
  1147:'/posts/cherry-g80-8100-60-percent-keyboard',
  1148:'/posts/cherry-g80-8100-60-percent-keyboard',
  1149:'/posts/cherry-g80-8100-60-percent-keyboard',
  1150:'/posts/cherry-g80-8100-60-percent-keyboard',
  1151:'/posts/cherry-g80-8100-60-percent-keyboard',
  1152:'/posts/cherry-g80-8100-60-percent-keyboard',
  1153:'/posts/cherry-g80-8100-60-percent-keyboard',
  1154:'/posts/cherry-g80-8100-60-percent-keyboard',
  1155:'/posts/cherry-g80-8100-60-percent-keyboard',
  1156:'/posts/cherry-g80-8100-60-percent-keyboard',
  1157:'/posts/cherry-g80-8100-60-percent-keyboard',
  1158:'/posts/cherry-g80-8100-60-percent-keyboard',
  1159:'/posts/cherry-g80-8100-60-percent-keyboard',
  1160:'/posts/cherry-g80-8100-60-percent-keyboard',
  1161:'/posts/cherry-g80-8100-60-percent-keyboard',
  1162:'/posts/cherry-g80-8100-60-percent-keyboard',
  1163:'/posts/cherry-g80-8100-60-percent-keyboard',
  1164:'/posts/cherry-g80-8100-60-percent-keyboard',
  1165:'/posts/cherry-g80-8100-60-percent-keyboard',
  1166:'/posts/cherry-g80-8100-60-percent-keyboard',
  1167:'/posts/cherry-g80-8100-60-percent-keyboard',
  1168:'/posts/cherry-g80-8100-60-percent-keyboard',
  1169:'/posts/cherry-g80-8100-60-percent-keyboard',
  1170:'/posts/cherry-g80-8100-60-percent-keyboard',
  1171:'/posts/cherry-g80-8100-60-percent-keyboard',
  1172:'/posts/cherry-g80-8100-60-percent-keyboard',
  1173:'/posts/cherry-g80-8100-60-percent-keyboard',
  1174:'/posts/cherry-g80-8100-60-percent-keyboard',
  1175:'/posts/cherry-g80-8100-60-percent-keyboard',
  1176:'/posts/cherry-g80-8100-60-percent-keyboard',
  1177:'/posts/cherry-g80-8100-60-percent-keyboard',
  1178:'/posts/cherry-g80-8100-60-percent-keyboard',
  1179:'/posts/cherry-g80-8100-60-percent-keyboard',
  1180:'/posts/cherry-g80-8100-60-percent-keyboard',
  1181:'/posts/cherry-g80-8100-60-percent-keyboard',
  1182:'/posts/cherry-g80-8100-60-percent-keyboard',
  1183:'/posts/cherry-g80-8100-60-percent-keyboard',
  1184:'/posts/cherry-g80-8100-60-percent-keyboard',
  1185:'/posts/cherry-g80-8100-60-percent-keyboard',
  1186:'/posts/cherry-g80-8100-60-percent-keyboard',
  1187:'/posts/cherry-g80-8100-60-percent-keyboard',
  1188:'/posts/cherry-g80-8100-60-percent-keyboard',
  1189:'/posts/cherry-g80-8100-60-percent-keyboard',
  1190:'/posts/cherry-g80-8100-60-percent-keyboard',
  1191:'/posts/cherry-g80-8100-60-percent-keyboard',

  // ── gh60-rev-c-plain-edition-is-out ──
  1224:'/posts/gh60-rev-c-plain-edition-is-out',
  1225:'/posts/gh60-rev-c-plain-edition-is-out',
  1227:'/posts/gh60-rev-c-plain-edition-is-out',
  1232:'/posts/gh60-rev-c-plain-edition-is-out',
  1233:'/posts/gh60-rev-c-plain-edition-is-out',

  // ── PAGES ──
  105: '/',                                    // about → home
  423: '/projects',                            // projects index
  428: '/projects/atmel-dfu-bootloader-abi-wrapper',
  478: '/projects/gh60-programmable-keyboard',
  978: '/',                                    // portfolio → home
  981: '/',                                    // portfolio/techkeys-us-business-card → home
  1041:'/posts/how-to-make-a-keyboard-the-matrix',  // projects/how-to-make-a-keyboard → post
  1123:'/',                                    // portfolio/techkeys-us-programmable-business-card → home

  // ── CROSS-POST ATTACHMENTS (resolved to non-parent slugs by WordPress) ──
  398: '/posts/wang-724-teardown',             // p1140586 — under using-atmel but redirects to wang
  880: '/posts/burning-ship',                  // deep_hi — standalone then burning-ship

  // ── GH60 PROJECT ATTACHMENTS ──
  498: '/projects/gh60-programmable-keyboard',
  503: '/projects/gh60-programmable-keyboard',
  514: '/projects/gh60-programmable-keyboard',
  515: '/projects/gh60-programmable-keyboard',
  516: '/projects/gh60-programmable-keyboard',
  517: '/projects/gh60-programmable-keyboard',
  524: '/projects/gh60-programmable-keyboard',
  526: '/projects/gh60-programmable-keyboard',
  760: '/projects/gh60-programmable-keyboard',
  849: '/projects/gh60-programmable-keyboard',
  850: '/projects/gh60-programmable-keyboard',
  851: '/projects/gh60-programmable-keyboard',
  852: '/projects/gh60-programmable-keyboard',
  853: '/projects/gh60-programmable-keyboard',
  1247:'/projects/gh60-programmable-keyboard',
};

const BASE = 'https://komar.blog';

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Both ?p=N and ?page_id=N resolve identically in WordPress — single lookup
  const id = url.searchParams.get('p') || url.searchParams.get('page_id');
  if (id !== null) {
    const target = ID_MAP[id];
    if (target) {
      return Response.redirect(`${BASE}${target}`, 301);
    }
    // Unknown ID → homepage
    return Response.redirect(BASE, 301);
  }

  // Bare homepage with no query string → komar.blog
  // (The _redirects / catch-all was removed because it would snatch /?p=N
  //  requests and drop the query string before this function could read it.)
  if (url.pathname === '/') {
    return Response.redirect(BASE, 301);
  }

  // Pass through to _redirects and static files
  return context.next();
}
