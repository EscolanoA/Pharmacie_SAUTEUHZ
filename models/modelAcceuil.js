
/**
 
 * Requette pour avoir le nombre de boites total d'une posologie sur la période de prise du medicament

SELECT TIMESTAMPDIFF(MONTH, posologie_debut, posologie_fin)* Posologies.posologie_nbboitesmois as nbTotalBoitesUnePos FROM Posologies;
 
 * 
 * 
 * 
 * Requette pour le nbtotal de medicaments sur toutes les ordonnances et le stock


SELECT Medicaments.*, SUM(TIMESTAMPDIFF(MONTH, posologie_debut, posologie_fin)* Posologies.posologie_nbboitesmois )as nbTotalBoitesUnePos
FROM Posologies, Medicaments
WHERE Medicaments.medicament_id = Posologies.posologie_medicament_id
GROUP BY Medicaments.medicament_nom;






medocs jusquà mois actuel + 1

SELECT Medicaments.*, SUM(TIMESTAMPDIFF(MONTH, posologie_debut, posologie_fin)* Posologies.posologie_nbboitesmois )as nbTotalBoitesUnePos
FROM Posologies, Medicaments
WHERE Medicaments.medicament_id = Posologies.posologie_medicament_id
AND posologie_fin <= (CURRENT_DATE() + INTERVAL 1 MONTH)
GROUP BY Medicaments.medicament_nom;
 */



