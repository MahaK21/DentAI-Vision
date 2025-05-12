/*
A webpage with a brief overview of our project and team.
*/
import "./About.css"
import Navbar from "../Navbar"
const TeamMember = ({name, role, program, row, img, github}) => (
	<div className="member" row={row}>
		<div className="img">
			<img className="about-pfp" src={`/assets/${img}`}></img>
		</div>
		<div className="details">
			<h2>{name}</h2>
			{/* Making a clickable div */}
			<a style={{"display":"block"}} href={github}>
				<div className="github">
					<img src="./assets/github.png"></img>
					<h4>{github.split(".com/")[1]}</h4>
				</div>
			</a>
			

			<h4>{program}</h4>
			<h4>{role}</h4>
		</div>
	</div>
)

export default function About() {
	return (
	<div>
		<Navbar/>
		<div className="info">
			<section>
				<h1>What is DentAI?</h1>
				<p>DentAI uses machine learning algorithms to detect cavities in X-ray images, helping patients feel confident in their dentist's diagnosis. 
We trained YOLOv5s, a deep learning model, on real dental X-rays to detect cavities and provide confidence scores for each prediction, ensuring transparency. 
Additionally, our AI-powered chatbot assists users by answering dental health questions based on verified knowledge sources. By combining advanced AI with accessibility,
DentAI empowers both patients and dental professionals to make informed decisions with confidence. Check out our GitHub in the link below!</p>
			</section>
			<section>
				<a style={{"display": "block"}} href="https://github.com/MahaK21/DentAI-Vision/">
				<div className="checkout">
					<img src="./assets/github.png"></img>
					<h2>DentAI-Vision</h2>
				</div>
				</a>
				
			</section>
			<section>
				<h1>Our Team</h1>
				<div className="teamInfo">
					<TeamMember className="row1"name="Maha Kesibi" role="Project Manager" program="Computing" img="Maha.png" row={1} github="https://github.com/MahaK21"></TeamMember>
					<TeamMember className="row1" name="Kamran Jornacion" role="Design Team Member" program="Applied Math Engineering" img="Kamran.png" row={1} github="https://github.com/KamranJornacion"></TeamMember>
					{/* <TeamMember className="row1" name="Kanika Poonia" role="Design Team Member" program="Computing" row={1} img="Kanika.png"></TeamMember>
					<TeamMember className="row1" name="Fouad Saffar" role="Design Team Member" program="Computer Engineering" img="Fouad.png" row={1}></TeamMember> */}
					<TeamMember className="row1" name="Leila Salem" role="Design Team Member" program="Computing" row={1} img="Leila.png" github="https://github.com/leilasalemm"></TeamMember>
					<TeamMember className="row2" name="Het Buddhev" role="Design Team Member" program="Computer Engineering" img="Het.jpg" row={2} github="https://github.com/HetBuddhdev10"></TeamMember>
					<TeamMember className="row2" name="Elliott Vince" role="Design Team Member" program="Computing" row={2} img="Elliott.png" github="https://github.com/evince05"></TeamMember>
				</div>
			</section>
			
		</div>
	</div>
	)
}