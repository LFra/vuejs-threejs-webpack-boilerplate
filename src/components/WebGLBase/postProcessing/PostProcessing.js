/**
* PostProcessing class
*/
class PostProcessing {

  /**
  * Constructor function
  *
  * @param {EffectComposer} EffectComposer EffectComposer instance
  * @param {Scene}          Scene          Scene instance
  * @param {Camera}         Camera         Camera instance
  * @param {Renderer}       Renderer       Renderer instance
  * @param {Configuration}  Configuration  Configuration instance
  */
  constructor( EffectComposer, Scene, Camera, Renderer, Configuration ) {

    this.composer          = EffectComposer;
    this.scene             = Scene;
    this.camera            = Camera;
    this.renderer          = Renderer;
    this.configuration     = Configuration;
    this.usePostProcessing = this.configuration.active;

    this.glitchTimeout = null;

    if( this.usePostProcessing ) {
      this.passes       = this.configuration.passes.filter( pass => pass.active );
      this.constructors = this.passes.map( pass => pass.constructor() );
    }

    // this.debug();
  }

  debug() {

    const onKeyUp = ( ev ) => {

      if( ev.keyCode === 87 ) { // w

        this.usePostProcessing = this.usePostProcessing ? false : true;

        if ( this.usePostProcessing ) {
          this.startGlitch();
        } else {
          window.clearTimeout( this.glitchTimeout );
        }
      }
    };

    document.addEventListener( 'keyup', onKeyUp, false );
  }

  /**
  * update function
  */
  update( ) {

    if( this.usePostProcessing ) {

      this.composer.reset();
      this.composer.render( this.scene, this.camera );

      for ( let i = 0; i < this.constructors.length; i++ ) {
        this.composer.pass( this.constructors[ i ] );
      }

      this.composer.toScreen();

    } else {

      this.renderer.render( this.scene, this.camera );
    }
  }
}

export default PostProcessing;
