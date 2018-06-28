export const device = {};

device.Android = function() {
  return navigator.userAgent.match(/Android/i);
};

device.BlackBerry = function() {
  return navigator.userAgent.match(/BlackBerry/i);
};

device.iOS = function() {
  return navigator.userAgent.match(/iPhone|iPod/i);
};

device.Opera = function() {
  return navigator.userAgent.match(/Opera Mini/i);
};

device.Windows = function() {
  return (
    navigator.userAgent.match(/IEMobile/i) ||
    navigator.userAgent.match(/WPDesktop/i)
  );
};

device.Facebook = function() {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
};

device.type = function() {
  if (
    /Mobile/i.test(navigator.userAgent) &&
    !/ipad/i.test(navigator.userAgent)
  ) {
    return "mobile";
  } else if (/ipad/i.test(navigator.userAgent)) {
    return "tablet";
  } else {
    return "desktop";
  }
};

device.getIP = async function() {
  let response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
};
