//辗转相除法 递归实现最大公约数
function gcd(m,n) {
  if(n) return gcd(n,m%n);
  return m;
};
