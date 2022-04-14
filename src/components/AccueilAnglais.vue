<template>
  <div id="titre">
    <center>
      <h2>Welcome to our elliptical curve explorer !</h2>
    </center>
  </div>
  <div id="corps">
    <p>
      Elliptic curves and their properties have been studied by
      mathematicians as a pure mathematical concept since the second or third
      third century AD but their use in cryptography is only very recent.
    </p>
    <p>
      Indeed, the first use of
      <a href="https://fr.wikipedia.org/wiki/Cryptographie_sur_les_courbes_elliptiques">elliptic curves in cryptography</a>
      goes back only to 1984, when Lenstra used it to factor
      integers. Then in 1985, Victor Miller and Neal Koblitz proposed
      cryptographic uses of elliptic curves. The main
      reason for using elliptic curve cryptography (ECC) is the fact that
      there is no known subexponential algorithm for solving the
      the discrete logarithm problem on a properly chosen elliptic curve.
      This means that much smaller parameters than for other protocols can be
      used in ECC with an equivalent level of security.
      For example, for 256-bit security, an ECC key of
      128-bit ECC key is sufficient for 256-bit security compared to 16,384-bit key for the
      RSA protocol (using AES-256).
    </p>
    <p>
      Thus, many encryption systems have been developed, including
      for shared public key systems such as
      <a href="https://fr.wikipedia.org/wiki/%C3%89change_de_cl%C3%A9s_Diffie-Hellman_bas%C3%A9_sur_les_courbes_elliptiques">ECDH</a>, 
      which is currently widely used in the SSL/TLS protocols for securing
      protocols for securing computer network exchanges. Moreover, the ECC is
      also generally used in order to carry out electronic signatures
      via the protocols
      <a href="https://fr.wikipedia.org/wiki/Elliptic_curve_digital_signature_algorithm">ECDSA</a>
      and <a href="https://fr.wikipedia.org/wiki/EdDSA">EdDSA</a>.
    </p>
    <p>
      However, the ECC is based on a "twisted" addition law defined between
      the points of a curve with coordinates in a body K that can be ℂ, ℝ, ℚ
      or a finite field GF with the important special cases m=1 and p=2.
      As a result, these curves can remain mysterious and intimidating to a
      neophyte. However, the operations on the points of a curve can be easily demystified
      with the help of a graphical representation.
    </p>
    <p>
        Before using these curves to encrypt our messages, we must understand them. 
        Elliptic curves are defined in three common types of curves: 
        <a href='https://fr.wikipedia.org/wiki/Courbe_elliptique'>Weierstrass</a>, 
        <a href='https://fr.wikipedia.org/wiki/Courbe_de_Montgomery'>Montgomery</a>, 
        <a href='https://fr.wikipedia.org/wiki/Courbe_d%27Edwards'>Edwards</a>. 
        Here are the equations :
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
      We invite you to browse this intuitive and educational web application
      to initiate you to simple calculations on elliptic curves. We put at your disposal 
      the three types of usual curves. You can create your own curves in modular and continuous mode !   
    </p>
    <p align='center'>
        Enjoy the experience !!!!
    </p>
  </div>
</template>

<script>
export default {
  name: "AccueilSite",
};
</script>

<style scoped>
#titre {
  color: var(--sidebar-bg-color);
  margin-left: 28%;
  font-family: 'Raleway', sans-serif
}

#corps {
  color: #eb9671;
  margin-left: 28%;
  text-align: "justify";
  font-family: 'Raleway', sans-serif
}

a {
    color: #eb9671;
}

</style>