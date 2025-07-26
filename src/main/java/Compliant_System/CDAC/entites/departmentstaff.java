package Compliant_System.CDAC.entites;

import java.time.LocalDateTime;

import Compliant_System.CDAC.enums.DepartmentName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class departmentstaff {
	@Id
	@GeneratedValue
	private long staffid;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private DepartmentName departmentname;
	
	@Builder.Default
	private Integer teamcount  = 1;
	
	@Builder.Default
	private boolean isavailable = true;
	
	@Builder.Default
	private LocalDateTime createdat = LocalDateTime.now();
}
