import React from "react";

const PlaceholderLogo = () => {
  const svgString = `
    <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
	width="36px"
    height="36px"
    viewBox="0 0 153 157"
    enable-background="new 0 0 153 157"
    xml:space="preserve"
  >
    <path
      fill="#FCFCFC"
      opacity="1.000000"
      stroke="none"
      d="
M1.000000,52.000000 
	C1.000000,34.666668 1.000000,17.833338 1.000000,1.000005 
	C51.999989,1.000003 102.999977,1.000003 153.999969,1.000002 
	C153.999985,53.333317 153.999985,105.666634 154.000000,157.999969 
	C103.000023,157.999969 52.000042,157.999969 1.000031,157.999985 
	C1.000000,122.833336 1.000000,87.666664 1.000000,52.000000 
M147.006912,124.367561 
	C147.283234,122.736038 147.796692,121.105072 147.800552,119.472900 
	C147.864853,92.322472 148.695496,65.137901 147.585953,38.033382 
	C146.855133,20.180498 135.576080,8.800901 117.147591,8.103928 
	C92.028191,7.153902 66.856239,7.341865 41.709572,7.494768 
	C32.382290,7.551482 23.370897,9.428902 15.951858,16.166252 
	C7.071583,24.230576 5.562967,34.788399 5.443581,45.709579 
	C5.204970,67.537125 5.086654,89.375031 5.538639,111.195824 
	C5.683413,118.185150 6.585427,125.631912 9.236491,131.996536 
	C14.555988,144.767502 25.883413,149.745758 39.021713,149.914780 
	C64.337791,150.240433 89.666672,150.277756 114.980072,149.842941 
	C130.448120,149.577240 143.137726,141.880905 147.006912,124.367561 
z"
    />
    <path
      fill="#282828"
      opacity="1.000000"
      stroke="none"
      d="
M146.904694,124.776779 
	C143.137726,141.880905 130.448120,149.577240 114.980072,149.842941 
	C89.666672,150.277756 64.337791,150.240433 39.021713,149.914780 
	C25.883413,149.745758 14.555988,144.767502 9.236491,131.996536 
	C6.585427,125.631912 5.683413,118.185150 5.538639,111.195824 
	C5.086654,89.375031 5.204970,67.537125 5.443581,45.709579 
	C5.562967,34.788399 7.071583,24.230576 15.951858,16.166252 
	C23.370897,9.428902 32.382290,7.551482 41.709572,7.494768 
	C66.856239,7.341865 92.028191,7.153902 117.147591,8.103928 
	C135.576080,8.800901 146.855133,20.180498 147.585953,38.033382 
	C148.695496,65.137901 147.864853,92.322472 147.800552,119.472900 
	C147.796692,121.105072 147.283234,122.736038 146.904694,124.776779 
M51.512142,142.976883 
	C63.676865,142.976883 75.842216,143.053253 88.006111,142.952835 
	C97.823013,142.871826 107.689781,143.140015 117.441910,142.245117 
	C131.834351,140.924408 139.743576,133.387680 140.203583,118.854301 
	C141.035645,92.567001 141.267700,66.222519 140.515305,39.937260 
	C140.048523,23.630539 130.565277,15.329691 114.088432,15.069436 
	C89.445747,14.680202 64.789322,14.650338 40.145920,14.989456 
	C22.501684,15.232258 13.687407,24.089388 12.975303,41.766106 
	C12.492861,53.741863 12.630116,65.746452 12.655872,77.737785 
	C12.684847,91.227501 12.589238,104.729042 13.119474,118.202942 
	C13.675974,132.344284 22.086794,140.933350 36.072292,142.327164 
	C40.861610,142.804489 45.701454,142.774887 51.512142,142.976883 
z"
    />
    <path
      fill="#FEFEFE"
      opacity="1.000000"
      stroke="none"
      d="
M51.015175,142.976883 
	C45.701454,142.774887 40.861610,142.804489 36.072292,142.327164 
	C22.086794,140.933350 13.675974,132.344284 13.119474,118.202942 
	C12.589238,104.729042 12.684847,91.227501 12.655872,77.737785 
	C12.630116,65.746452 12.492861,53.741863 12.975303,41.766106 
	C13.687407,24.089388 22.501684,15.232258 40.145920,14.989456 
	C64.789322,14.650338 89.445747,14.680202 114.088432,15.069436 
	C130.565277,15.329691 140.048523,23.630539 140.515305,39.937260 
	C141.267700,66.222519 141.035645,92.567001 140.203583,118.854301 
	C139.743576,133.387680 131.834351,140.924408 117.441910,142.245117 
	C107.689781,143.140015 97.823013,142.871826 88.006111,142.952835 
	C75.842216,143.053253 63.676865,142.976883 51.015175,142.976883 
M64.127144,40.138992 
	C59.231895,47.526688 54.336651,54.914383 49.137974,62.760002 
	C44.872993,56.397614 41.080505,50.753811 37.302376,45.100414 
	C32.815781,38.386894 30.348528,37.510944 22.120550,39.908951 
	C29.098135,50.091831 36.031120,60.209621 42.909237,70.247345 
	C35.340416,81.126152 27.986637,91.695877 20.432348,102.553795 
	C27.663340,103.911629 32.760418,103.151512 36.252094,96.263565 
	C39.533291,89.790840 44.265549,84.053696 48.689930,77.503487 
	C52.918877,83.928741 56.930565,90.010010 60.927914,96.100700 
	C66.177963,104.100105 66.318832,104.164230 76.435158,102.353569 
	C75.531113,100.885132 74.744942,99.481728 73.840309,98.159363 
	C68.108406,89.780655 62.418621,81.371498 56.553089,73.086990 
	C55.075523,71.000069 55.004898,69.547997 56.534687,67.419861 
	C61.779644,60.123440 66.801094,52.665997 71.882713,45.252773 
	C73.138931,43.420162 74.300446,41.522629 76.084335,38.757805 
	C71.491356,39.068539 68.076309,39.299580 64.127144,40.138992 
M104.137665,82.680046 
	C105.258568,81.126732 106.379471,79.573410 107.782135,77.629639 
	C112.239410,84.402893 116.431282,90.765320 120.615280,97.132919 
	C124.916306,103.678635 127.051804,104.430519 135.540009,102.113770 
	C129.088623,92.721436 122.797874,83.377068 116.283188,74.191528 
	C114.323914,71.429016 113.905121,69.424278 116.137062,66.422676 
	C121.786423,58.825199 126.996651,50.900497 132.350723,43.084908 
	C133.126678,41.952202 133.726349,40.698727 134.319565,39.655907 
	C126.956825,37.316025 122.358894,39.657860 118.993240,46.139645 
	C116.057571,51.793346 112.030472,56.880329 108.138992,62.739601 
	C104.181282,56.838627 100.009209,51.784397 97.157562,46.071110 
	C93.589394,38.922256 88.308914,37.834618 80.912010,39.585457 
	C87.987297,49.914028 94.901154,60.006947 101.900612,70.224823 
	C94.418411,81.004898 87.016182,91.669754 79.469276,102.543060 
	C86.491508,103.875679 91.724716,103.382530 94.993858,96.591415 
	C97.276329,91.849960 100.810692,87.711143 104.137665,82.680046 
M94.185753,123.825630 
	C82.320671,127.726646 70.626419,126.171959 58.981323,122.751434 
	C56.595860,122.050751 54.177135,120.996422 51.771214,120.989532 
	C50.046658,120.984581 48.317867,122.453941 46.590973,123.265541 
	C47.720398,124.796593 48.542019,127.128845 50.038738,127.703857 
	C54.036560,129.239761 58.395725,129.802780 62.484184,131.140823 
	C77.756813,136.139114 92.316895,132.384155 106.725586,127.534042 
	C108.146034,127.055893 108.846741,124.439529 109.881516,122.815620 
	C108.246506,122.135368 106.521255,120.731766 104.994858,120.922180 
	C101.589424,121.346985 98.283264,122.567558 94.185753,123.825630 
z"
    />
    <path
      fill="#212121"
      opacity="1.000000"
      stroke="none"
      d="
M64.394196,39.834808 
	C68.076309,39.299580 71.491356,39.068539 76.084335,38.757805 
	C74.300446,41.522629 73.138931,43.420162 71.882713,45.252773 
	C66.801094,52.665997 61.779644,60.123440 56.534687,67.419861 
	C55.004898,69.547997 55.075523,71.000069 56.553089,73.086990 
	C62.418621,81.371498 68.108406,89.780655 73.840309,98.159363 
	C74.744942,99.481728 75.531113,100.885132 76.435158,102.353569 
	C66.318832,104.164230 66.177963,104.100105 60.927914,96.100700 
	C56.930565,90.010010 52.918877,83.928741 48.689930,77.503487 
	C44.265549,84.053696 39.533291,89.790840 36.252094,96.263565 
	C32.760418,103.151512 27.663340,103.911629 20.432348,102.553795 
	C27.986637,91.695877 35.340416,81.126152 42.909237,70.247345 
	C36.031120,60.209621 29.098135,50.091831 22.120550,39.908951 
	C30.348528,37.510944 32.815781,38.386894 37.302376,45.100414 
	C41.080505,50.753811 44.872993,56.397614 49.137974,62.760002 
	C54.336651,54.914383 59.231895,47.526688 64.394196,39.834808 
z"
    />
    <path
      fill="#212121"
      opacity="1.000000"
      stroke="none"
      d="
M103.961761,82.991592 
	C100.810692,87.711143 97.276329,91.849960 94.993858,96.591415 
	C91.724716,103.382530 86.491508,103.875679 79.469276,102.543060 
	C87.016182,91.669754 94.418411,81.004898 101.900612,70.224823 
	C94.901154,60.006947 87.987297,49.914028 80.912010,39.585457 
	C88.308914,37.834618 93.589394,38.922256 97.157562,46.071110 
	C100.009209,51.784397 104.181282,56.838627 108.138992,62.739601 
	C112.030472,56.880329 116.057571,51.793346 118.993240,46.139645 
	C122.358894,39.657860 126.956825,37.316025 134.319565,39.655907 
	C133.726349,40.698727 133.126678,41.952202 132.350723,43.084908 
	C126.996651,50.900497 121.786423,58.825199 116.137062,66.422676 
	C113.905121,69.424278 114.323914,71.429016 116.283188,74.191528 
	C122.797874,83.377068 129.088623,92.721436 135.540009,102.113770 
	C127.051804,104.430519 124.916306,103.678635 120.615280,97.132919 
	C116.431282,90.765320 112.239410,84.402893 107.782135,77.629639 
	C106.379471,79.573410 105.258568,81.126732 103.961761,82.991592 
z"
    />
    <path
      fill="#282828"
      opacity="1.000000"
      stroke="none"
      d="
M94.561203,123.644760 
	C98.283264,122.567558 101.589424,121.346985 104.994858,120.922180 
	C106.521255,120.731766 108.246506,122.135368 109.881516,122.815620 
	C108.846741,124.439529 108.146034,127.055893 106.725586,127.534042 
	C92.316895,132.384155 77.756813,136.139114 62.484184,131.140823 
	C58.395725,129.802780 54.036560,129.239761 50.038738,127.703857 
	C48.542019,127.128845 47.720398,124.796593 46.590973,123.265541 
	C48.317867,122.453941 50.046658,120.984581 51.771214,120.989532 
	C54.177135,120.996422 56.595860,122.050751 58.981323,122.751434 
	C70.626419,126.171959 82.320671,127.726646 94.561203,123.644760 
z"
    />
  </svg>
`;
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};

export default PlaceholderLogo;
