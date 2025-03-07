/*
A webpage with a brief overview of our project and team.
*/
import "./About.css"
import Navbar from "../Navbar"
const TeamMember = ({name, role, program, row, img}) => (
	<div className="member" row={row}>
		<div className="img">
			<img className="about-pfp" src={`/assets/${img}`}></img>
		</div>
		<div className="details">
			<h2>{name}</h2>
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
				<p>DentAI uses machine learning algorithms to detect cavities in X-Ray images. Our goal is to help patients feel confident in their dentist's diagnosis.
				Let's write more about it down here.</p>
			</section>
			<section>
				<h1>Our Team</h1>
				<div className="teamInfo">
					<TeamMember className="row1"name="Maha Kesibi" role="Project Manager" program="Computing" img="Maha.png" row={1}></TeamMember>
					<TeamMember className="row1" name="Kamran Jornacion" role="Design Team Member" program="Applied Math Engineering" img="Kamran.png" row={1}></TeamMember>
					<TeamMember className="row1" name="Kanika Poonia" role="Design Team Member" program="Computing" row={1} img="Kanika.png"></TeamMember>
					<TeamMember className="row1" name="Fouad Saffar" role="Design Team Member" program="Computer Engineering" img="Fouad.png" row={1}></TeamMember>
					<TeamMember className="row2" name="Leila Salem" role="Design Team Member" program="Computing" row={2} img="Leila.png"></TeamMember>
					<TeamMember className="row2" name="Het Buddhev" role="Design Team Member" program="Computer Engineering" img="Het.jpg" row={2}></TeamMember>
					<TeamMember className="row2" name="Elliott Vince" role="Design Team Member" program="Computing" row={2} img="Elliott.png"></TeamMember>
				</div>
			</section>
			
		</div>
	</div>
	)
}