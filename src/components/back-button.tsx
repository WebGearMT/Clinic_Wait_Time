import { useNavigate } from "react-router-dom"


export const BackButton = () => {

	const navigate = useNavigate();

	return (
	<button 
		  onClick={() => navigate(-1)} 
		  style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
		  className="mb-12"
		>
	  {/* Left Arrow Icon using an HTML Character entity */}
	  <span>&#8592;</span> 
	  <span>Go Back</span>
	</button>
	);
};
