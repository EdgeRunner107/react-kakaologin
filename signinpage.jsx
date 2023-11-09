    const CLIENT_ID = "edb2e3648fa374acbe7be705a5474a8a";
    const REDIRECT_URI =  "http://localhost:5000/kakaologin/callback";
  // 프런트엔드 리다이랙트 URI 예시
  // const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";
  
  // 백엔드 리다이랙트 URI 예시
  // const REDIRECT_URI =  "http://localhost:5000/kakao/code";
  
  
   const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  
   const navi=useNavigate();
   const ref_uid = useRef(null);
   const [form, setForm] = useState({
       uid: 'blue',
       upass: 'pass'
   });
