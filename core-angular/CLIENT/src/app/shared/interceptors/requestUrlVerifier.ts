export function VerifyUrl(url: string) {
  if (
    url.toLocaleLowerCase().includes('addwishlistitem') ||
    url.toLocaleLowerCase().includes('getuserwishlist') ||
    url.toLocaleLowerCase().includes('deletewishlistitem')
  )
    return true;
  return false;
}
