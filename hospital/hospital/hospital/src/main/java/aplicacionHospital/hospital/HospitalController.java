package aplicacionHospital.hospital;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/hospital")
public class HospitalController {
	
	@Autowired
	private HospitalRepository hospitalRepository;
	
	@PostMapping("/")
	public void createHospital(@RequestBody Hospital hospital) {
		hospitalRepository.save(hospital);
	}

	@DeleteMapping("/{id}")
	public void deleteHospital(@PathVariable("id") Integer id) {
		Hospital h = new Hospital();
		h.setId(id);
		hospitalRepository.delete(h);
	}
	
	@GetMapping("/")
	public List<Hospital> listHospital() {
		List<Hospital> hospitales = hospitalRepository.findAll();
		return hospitales;
	}
	
	@PutMapping("/{id}")
	public void updateHospital(@RequestBody Hospital hospital, @PathVariable("id") Integer id) {
		hospital.setId(id);
		hospitalRepository.save(hospital);
	}

}
