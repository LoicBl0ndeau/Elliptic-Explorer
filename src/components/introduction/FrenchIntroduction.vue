<template>
  <div id="titre">
    <center>
      <h2>Bienvenue sur notre explorateur de courbes elliptiques !</h2>
    </center>
  </div>
  <div id="corps">
    <p>
      Les courbes elliptiques et leurs propriétés ont été étudiées par les
      mathématiciens en tant que pur concept mathématique depuis le deuxième ou
      troisième siècle après J.C mais leur utilisation en cryptographie n’est
      que très récente.
    </p>
    <p>
      En effet, la première utilisation des
      <a href="https://fr.wikipedia.org/wiki/Cryptographie_sur_les_courbes_elliptiques">courbes elliptiques en
        cryptographie</a>
      remonte à seulement 1984, où Lenstra s’en est servi pour factoriser des
      nombres entiers. Puis en 1985, Victor Miller et Neal Koblitz ont proposé
      des utilisations cryptographiques des courbes elliptiques. La principale
      raison d’utilisation de la cryptographie à courbe elliptique (ECC) est le
      fait qu'il n'existe pas d'algorithme sous-exponentiel connu pour résoudre
      le problème du logarithme discret sur une courbe elliptique correctement
      choisie. Ce qui signifie que des paramètres nettement plus petits que pour
      d’autres protocoles peuvent être utilisés dans ECC avec un niveau de
      sécurité équivalent. Par exemple, pour une sécurité de 256 bits, il suffit
      d’une clé ECC de 128 bits contre une clé de 16 384 bits pour le protocole
      RSA (en utilisant AES-256).
    </p>
    <p>
      Ainsi, de nombreux systèmes de chiffrement ont été développés, notamment
      pour les systèmes de clés publiques partagées tel que
      <a
        href="https://fr.wikipedia.org/wiki/%C3%89change_de_cl%C3%A9s_Diffie-Hellman_bas%C3%A9_sur_les_courbes_elliptiques">ECDH</a>,
      qui actuellement largement utilisé dans les protocoles SSL/TLS de
      sécurisation des échanges par réseau informatique. Qui plus est, l’ECC est
      aussi généralement utilisée afin de réaliser des signatures électroniques
      via les protocoles
      <a href="https://fr.wikipedia.org/wiki/Elliptic_curve_digital_signature_algorithm">ECDSA</a>
      et <a href="https://fr.wikipedia.org/wiki/EdDSA">EdDSA</a>.
    </p>
    <p>
      Toutefois, l’ECC est basé sur une loi d’addition « tordue » définie entre
      les points d’une courbe à coordonnées dans un corps K pouvant être ℂ, ℝ, ℚ
      ou un corps fini GF avec les cas particuliers importants m=1 et p=2.
      De ce fait, ces courbes peuvent rester mystérieuses et intimidantes pour
      un néophyte. Cependant, les opérations sur les points d’une courbe peuvent
      facilement être démystifiées à l’aide d’une représentation graphique.
    </p>
    <p>
      Avant d'utiliser ces courbes pour chiffrer nos messages, on doit les comprendre.
      Les courbes elliptiques se définissent en trois types de courbes usuelles :
      <a href='https://fr.wikipedia.org/wiki/Courbe_elliptique'>Weierstrass</a>,
      <a href='https://fr.wikipedia.org/wiki/Courbe_de_Montgomery'>Montgomery</a>,
      <a href='https://fr.wikipedia.org/wiki/Courbe_d%27Edwards'>Edwards</a>.
      En voici respectivement les équations :
    </p>
    <p align='center'>
      y<sup>2</sup> = x<sup>3</sup> + Ax + B
    </p>
    <p align='center'>
      By<sup>2</sup> = x<sup>3</sup> + Ax<sup>2</sup> + x
    </p>
    <p align='center'>
      x<sup>2</sup> + y<sup>2</sup> = c<sup>2</sup>(1 + dx<sup>2</sup>y<sup>2</sup>)
    </p>
    <p>
      Nous vous invitons à parcourir cette application web intuitive et pédagogique
      pour vous initier aux calculs simples sur des courbes elliptiques. Nous mettons à
      votre disposition les trois types de courbes usuelles. Vous pouvez créé vos propres
      courbes en modulaire et en continue !
    </p>
    <p align='center'>
      Appréciez l'expérience !!!!
    </p>
  </div>
</template>

<script>
export default {
  name: "FrenchIntroduction",
};
</script>

<style scoped>
#titre {
  color: var(--sidebar-bg-color);
  font-family: 'Raleway', sans-serif;
  margin-left: 28%;
}

#corps {
  color: #eb9671;
  font-family: 'Raleway', sans-serif;
  margin-left: 28%;
}

a {
  color: #eb9671;
}
</style>