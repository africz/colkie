/**
 * @param  {string} func
 * @param  {string} fileName
 * @param  {string|null} caller?
 */
export async function getFunc(
  func: string,
  fileName: string,
  caller?: string | null,
  userName?: string | null,
  mod?: string | null,
): Promise<string> {
  if (!caller) {
    caller = '';
  }
  if (!mod) {
    mod = '';
  } else {
    mod = mod + ',';
  }

  if (!userName) {
    userName = '';
  } else {
    userName = userName + ',';
  }
  return `${mod}${userName}${func}(${caller}),${fileName}@`;
}
