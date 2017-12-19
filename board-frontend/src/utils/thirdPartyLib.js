//react에서 global function을 직접 접근하지 못해서
//따로 export한걸 참고 하는 목적으로 만듦

const $ = window.$;
const Materialize = window.Materialize;
const Kakao = window.Kakao;


export { $, Materialize, Kakao }