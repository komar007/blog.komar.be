# Redirect Map: blog.komar.be → komar.blog

All old WordPress URLs (`http://blog.komar.be/*`) mapped to the new Zola site (`https://komar.blog/*`).

**Source of truth:**
- Old URLs from `http://blog.komar.be/post.xml`, `page.xml`, `taxonomy_category.xml` (BWP Google XML Sitemaps)
- New URLs from `https://komar.blog/sitemap.xml` (Zola-generated)

**Deployment:** Place `_redirects` in the root of the Cloudflare Pages deployment. All rules use 301 (Moved Permanently) and cross-domain absolute URLs.

---

## Posts (15 old → 14 imported + 1 renamed)

| Old URL (`blog.komar.be/...`) | New URL (`komar.blog/...`) | Note |
|---|---|---|
| `/how-to-make-a-keyboard-the-matrix/` | `/posts/how-to-make-a-keyboard-the-matrix/` | |
| `/gh60-rev-c-plain-edition-is-out/` | `/posts/gh60-rev-c-plain-edition-is-out/` | |
| `/60-cherry-mx-8100-mod/` | `/posts/cherry-g80-8100-60-percent-keyboard/` | **slug renamed** |
| `/burning-ship/` | `/posts/burning-ship/` | |
| `/led-strip-dimmer-and-potting-attempt/` | `/posts/led-strip-dimmer-and-potting-attempt/` | |
| `/introducing-the-gh60-keyboard-project/` | `/posts/introducing-the-gh60-keyboard-project/` | |
| `/making-my-own-pendrive-kind-of/` | `/posts/making-my-own-pendrive-kind-of/` | |
| `/making-pcb-artwork-in-kicad/` | `/posts/making-pcb-artwork-in-kicad/` | |
| `/gh60-evolution/` | `/posts/gh60-evolution/` | |
| `/logged-in-through-ssh/` | `/posts/logged-in-through-ssh/` | |
| `/using-atmels-dfu-bootloader-abi-on-atmega32u4-in-avr-gcc/` | `/posts/using-atmels-dfu-bootloader-abi-on-atmega32u4-in-avr-gcc/` | |
| `/9999-in-1-reloaded-part-1/` | `/posts/9999-in-1-reloaded-part-1/` | |
| `/9999-in-1-reloaded-part-2/` | `/posts/9999-in-1-reloaded-part-2/` | |
| `/wang-724-teardown/` | `/posts/wang-724-teardown/` | |
| `/my-way-of-handling-pdfs-in-xmonad/` | `/posts/my-way-of-handling-pdfs-in-xmonad/` | |

**Not imported on new blog (new posts):**
- `/posts/keep-the-git-conflict-side-under-cursor-in-neo-vim/` — new post, no old URL

---

## Projects (4 old → 3 mapped)

| Old URL (`blog.komar.be/...`) | New URL (`komar.blog/...`) | Note |
|---|---|---|
| `/projects/` | `/projects/` | |
| `/projects/gh60-programmable-keyboard/` | `/projects/gh60-programmable-keyboard/` | |
| `/projects/project-atmel-dfu-bootloader-abi-wrapper/` | `/projects/atmel-dfu-bootloader-abi-wrapper/` | **slug renamed** |
| `/projects/how-to-make-a-keyboard/` | `/posts/how-to-make-a-keyboard-the-matrix/` | redirects to post |

**Not imported on new blog (new project):**
- `/projects/cargo-lock-fetch/` — new project, no old URL

---

## Portfolio → Home (3 URLs, not imported)

| Old URL | Redirects to |
|---|---|
| `/portfolio/` | `https://komar.blog/` |
| `/portfolio/techkeys-us-business-card/` | `https://komar.blog/` |
| `/portfolio/techkeys-us-programmable-business-card/` | `https://komar.blog/` |

---

## About → Home

| Old URL | Redirects to |
|---|---|
| `/about/` | `https://komar.blog/` |

---

## Categories → Tags (8 old categories)

| Old Category | New Tag | Note |
|---|---|---|
| `/category/art/` | `/tags/art/` | |
| `/category/electronics/` | `/tags/electronics/` | |
| `/category/electronics/kicad-electronics/` | `/tags/kicad/` | subcategory mapped to kicad |
| `/category/keyboards/` | `/tags/keyboards/` | |
| `/category/kicad/` | `/tags/kicad/` | |
| `/category/programming/` | `/tags/programming/` | |
| `/category/shell-scripting/` | `/tags/` | no matching tag → tag index |
| `/category/xmonad/` | `/tags/xmonad/` | |

---

## WordPress Meta & Internals (catch-all patterns)

| Old pattern | Redirects to |
|---|---|
| `/feed/` | `/atom.xml` |
| `/comments/feed/` | `/atom.xml` |
| `/author/*` | home |
| `/tag/*` | `/tags/:splat` |
| `/page/*` | `/posts/` |
| `/wp-content/*` | home |
| `/wp-includes/*` | home |
| `/wp-json/*` | home |
| `/xmlrpc.php` | home |
| `/wp-login.php` | home |
| `/wp-admin/*` | home |

---

## Verification

To test after deployment:

```bash
# Exact post redirect
curl -sI http://blog.komar.be/how-to-make-a-keyboard-the-matrix/ | grep -i location
# → Location: https://komar.blog/posts/how-to-make-a-keyboard-the-matrix/

# Renamed slug redirect
curl -sI http://blog.komar.be/60-cherry-mx-8100-mod/ | grep -i location
# → Location: https://komar.blog/posts/cherry-g80-8100-60-percent-keyboard/

# Category → tag redirect
curl -sI http://blog.komar.be/category/electronics/ | grep -i location
# → Location: https://komar.blog/tags/electronics/

# WordPress feed → Atom
curl -sI http://blog.komar.be/feed/ | grep -i location
# → Location: https://komar.blog/atom.xml
```

All responses should be `HTTP/2 301` or `HTTP/1.1 301`.
