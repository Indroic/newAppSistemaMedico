type Theme = {
  accentBackground: string;
  accentColor: string;
  background0: string;
  background025: string;
  background05: string;
  background075: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color0: string;
  color025: string;
  color05: string;
  color075: string;
  background: string;
  backgroundHover: string;
  backgroundPress: string;
  backgroundFocus: string;
  borderColor: string;
  borderColorHover: string;
  borderColorPress: string;
  borderColorFocus: string;
  color: string;
  colorHover: string;
  colorPress: string;
  colorFocus: string;
  colorTransparent: string;
  placeholderColor: string;
  outlineColor: string;

}

function t(a: [number, number][]) {
  let res: Record<string,string> = {}
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = vs[vi] as string
  }
  return res as Theme
}
const vs = [
  'hsla(233, 50%, 76%, 1)',
  'hsla(0, 20%, 99%, 0)',
  'hsla(0, 20%, 99%, 0.25)',
  'hsla(0, 20%, 99%, 0.5)',
  'hsla(0, 20%, 99%, 0.75)',
  'hsla(0, 15%, 99%, 1)',
  'hsla(0, 15%, 93%, 1)',
  'hsla(0, 15%, 88%, 1)',
  'hsla(0, 15%, 82%, 1)',
  'hsla(0, 15%, 77%, 1)',
  'hsla(0, 15%, 72%, 1)',
  'hsla(0, 15%, 66%, 1)',
  'hsla(0, 15%, 61%, 1)',
  'hsla(0, 15%, 55%, 1)',
  'hsla(0, 15%, 50%, 1)',
  'hsla(240, 52%, 39%, 1)',
  'hsla(240, 52%, 10%, 1)',
  'hsla(240, 53%, 10%, 0)',
  'hsla(240, 53%, 10%, 0.25)',
  'hsla(240, 53%, 10%, 0.5)',
  'hsla(240, 53%, 10%, 0.75)',
  'hsla(233, 50%, 57%, 1)',
  'hsla(0, 14%, 10%, 0)',
  'hsla(0, 14%, 10%, 0.25)',
  'hsla(0, 14%, 10%, 0.5)',
  'hsla(0, 14%, 10%, 0.75)',
  'hsla(0, 15%, 10%, 1)',
  'hsla(0, 15%, 14%, 1)',
  'hsla(0, 15%, 19%, 1)',
  'hsla(0, 15%, 23%, 1)',
  'hsla(0, 15%, 28%, 1)',
  'hsla(0, 15%, 32%, 1)',
  'hsla(0, 15%, 37%, 1)',
  'hsla(0, 15%, 41%, 1)',
  'hsla(0, 15%, 46%, 1)',
  'hsla(240, 52%, 93%, 1)',
  'hsla(240, 52%, 95%, 1)',
  'hsla(240, 52%, 95%, 0)',
  'hsla(240, 52%, 95%, 0.25)',
  'hsla(240, 52%, 95%, 0.5)',
  'hsla(240, 52%, 95%, 0.75)',
  'hsla(232, 50%, 82%, 0)',
  'hsla(232, 50%, 82%, 0.25)',
  'hsla(232, 50%, 82%, 0.5)',
  'hsla(232, 50%, 82%, 0.75)',
  'hsla(233, 50%, 82%, 1)',
  'hsla(233, 50%, 80%, 1)',
  'hsla(233, 50%, 78%, 1)',
  'hsla(233, 50%, 74%, 1)',
  'hsla(233, 50%, 73%, 1)',
  'hsla(233, 50%, 71%, 1)',
  'hsla(233, 50%, 69%, 1)',
  'hsla(233, 50%, 67%, 1)',
  'hsla(233, 50%, 65%, 1)',
  'hsla(250, 50%, 95%, 1)',
  'hsla(249, 52%, 95%, 0)',
  'hsla(249, 52%, 95%, 0.25)',
  'hsla(249, 52%, 95%, 0.5)',
  'hsla(249, 52%, 95%, 0.75)',
  'hsla(233, 50%, 35%, 0)',
  'hsla(233, 50%, 35%, 0.25)',
  'hsla(233, 50%, 35%, 0.5)',
  'hsla(233, 50%, 35%, 0.75)',
  'hsla(233, 50%, 35%, 1)',
  'hsla(233, 50%, 38%, 1)',
  'hsla(233, 50%, 41%, 1)',
  'hsla(233, 50%, 43%, 1)',
  'hsla(233, 50%, 46%, 1)',
  'hsla(233, 50%, 49%, 1)',
  'hsla(233, 50%, 52%, 1)',
  'hsla(233, 50%, 54%, 1)',
  'hsla(233, 50%, 60%, 1)',
  'hsla(250, 50%, 90%, 1)',
]

const ks = [
'accentBackground',
'accentColor',
'background0',
'background025',
'background05',
'background075',
'color1',
'color2',
'color3',
'color4',
'color5',
'color6',
'color7',
'color8',
'color9',
'color10',
'color11',
'color12',
'color0',
'color025',
'color05',
'color075',
'background',
'backgroundHover',
'backgroundPress',
'backgroundFocus',
'borderColor',
'borderColorHover',
'borderColorPress',
'borderColorFocus',
'color',
'colorHover',
'colorPress',
'colorFocus',
'colorTransparent',
'placeholderColor',
'outlineColor']


const n1 = t([[0, 0],[1, 0],[2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 7],[9, 8],[10, 9],[11, 10],[12, 11],[13, 12],[14, 13],[15, 14],[16, 15],[17, 16],[18, 17],[19, 18],[20, 19],[21, 20],[22, 5],[23, 4],[24, 6],[25, 6],[26, 8],[27, 7],[28, 9],[29, 8],[30, 16],[31, 15],[32, 16],[33, 15],[34, 17],[35, 13],[36, 18]])

export const light = n1
const n2 = t([[0, 21],[1, 21],[2, 22],[3, 23],[4, 24],[5, 25],[6, 26],[7, 27],[8, 28],[9, 29],[10, 30],[11, 31],[12, 32],[13, 33],[14, 34],[15, 14],[16, 35],[17, 36],[18, 37],[19, 38],[20, 39],[21, 40],[22, 26],[23, 27],[24, 25],[25, 25],[26, 29],[27, 30],[28, 28],[29, 29],[30, 36],[31, 35],[32, 36],[33, 35],[34, 37],[35, 34],[36, 38]])

export const dark = n2
const n3 = t([[0, 8],[1, 8],[2, 41],[3, 42],[4, 43],[5, 44],[6, 45],[7, 46],[8, 47],[9, 0],[10, 48],[11, 49],[12, 50],[13, 51],[14, 52],[15, 53],[16, 54],[17, 54],[18, 55],[19, 56],[20, 57],[21, 58],[22, 45],[23, 44],[24, 46],[25, 46],[26, 0],[27, 47],[28, 48],[29, 0],[30, 54],[31, 54],[32, 54],[33, 54],[34, 55],[35, 52],[36, 56]])

export const light_accent = n3
const n4 = t([[0, 34],[1, 34],[2, 59],[3, 60],[4, 61],[5, 62],[6, 63],[7, 64],[8, 65],[9, 66],[10, 67],[11, 68],[12, 69],[13, 70],[14, 21],[15, 71],[16, 72],[17, 54],[18, 55],[19, 56],[20, 57],[21, 58],[22, 63],[23, 64],[24, 62],[25, 62],[26, 66],[27, 67],[28, 65],[29, 66],[30, 54],[31, 72],[32, 54],[33, 72],[34, 55],[35, 21],[36, 56]])

export const dark_accent = n4
const n5 = t([[30, 15],[31, 14],[32, 15],[33, 14]])

export const light_alt1 = n5
const n6 = t([[30, 14],[31, 13],[32, 14],[33, 13]])

export const light_alt2 = n6
const n7 = t([[22, 8],[23, 7],[24, 9],[25, 9],[26, 11],[27, 10],[29, 11],[28, 12]])

export const light_active = n7
export const light_surface3 = n7
const n8 = t([[22, 6],[23, 5],[24, 7],[25, 7],[26, 9],[27, 8],[29, 9],[28, 10]])

export const light_surface1 = n8
const n9 = t([[22, 7],[23, 6],[24, 8],[25, 8],[26, 10],[27, 9],[29, 10],[28, 11]])

export const light_surface2 = n9
const n10 = t([[22, 10],[23, 10],[24, 11],[25, 11],[26, 10],[27, 10],[29, 11],[28, 11]])

export const light_surface4 = n10
const n11 = t([[30, 35],[31, 14],[32, 35],[33, 14]])

export const dark_alt1 = n11
const n12 = t([[30, 14],[31, 34],[32, 14],[33, 34]])

export const dark_alt2 = n12
const n13 = t([[22, 29],[23, 30],[24, 28],[25, 28],[26, 32],[27, 33],[29, 32],[28, 31]])

export const dark_active = n13
export const dark_surface3 = n13
const n14 = t([[22, 27],[23, 28],[24, 26],[25, 26],[26, 30],[27, 31],[29, 30],[28, 29]])

export const dark_surface1 = n14
const n15 = t([[22, 28],[23, 29],[24, 27],[25, 27],[26, 31],[27, 32],[29, 31],[28, 30]])

export const dark_surface2 = n15
const n16 = t([[22, 31],[23, 31],[24, 30],[25, 30],[26, 31],[27, 31],[29, 30],[28, 30]])

export const dark_surface4 = n16
const n17 = t([[30, 54],[31, 53],[32, 54],[33, 53]])

export const light_accent_alt1 = n17
const n18 = t([[30, 53],[31, 52],[32, 53],[33, 52]])

export const light_accent_alt2 = n18
const n19 = t([[22, 0],[23, 47],[24, 48],[25, 48],[26, 50],[27, 49],[29, 50],[28, 51]])

export const light_accent_active = n19
export const light_accent_surface3 = n19
const n20 = t([[22, 46],[23, 45],[24, 47],[25, 47],[26, 48],[27, 0],[29, 48],[28, 49]])

export const light_accent_surface1 = n20
const n21 = t([[22, 47],[23, 46],[24, 0],[25, 0],[26, 49],[27, 48],[29, 49],[28, 50]])

export const light_accent_surface2 = n21
const n22 = t([[22, 49],[23, 49],[24, 50],[25, 50],[26, 49],[27, 49],[29, 50],[28, 50]])

export const light_accent_surface4 = n22
const n23 = t([[30, 72],[31, 71],[32, 72],[33, 71]])

export const dark_accent_alt1 = n23
const n24 = t([[30, 71],[31, 21],[32, 71],[33, 21]])

export const dark_accent_alt2 = n24
const n25 = t([[22, 66],[23, 67],[24, 65],[25, 65],[26, 69],[27, 70],[29, 69],[28, 68]])

export const dark_accent_active = n25
export const dark_accent_surface3 = n25
const n26 = t([[22, 64],[23, 65],[24, 63],[25, 63],[26, 67],[27, 68],[29, 67],[28, 66]])

export const dark_accent_surface1 = n26
const n27 = t([[22, 65],[23, 66],[24, 64],[25, 64],[26, 68],[27, 69],[29, 68],[28, 67]])

export const dark_accent_surface2 = n27
const n28 = t([[22, 68],[23, 68],[24, 67],[25, 67],[26, 68],[27, 68],[29, 67],[28, 67]])

export const dark_accent_surface4 = n28