/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/******************************
 * Entity Animation Functions *
 ******************************/
// ThreeGen.prototype.animateEntity = function(entity) {
//   if (entity.animation.active) {

//     // Key frame animation
//     if (entity.animation.walking) {
//       var time = this.clock.delta % entity.animation.duration;
//       entity.animation.keyframe = Math.floor(time / entity.animation.interpolation) + entity.animation.offset;

//       if (entity.animation.keyframe !== entity.animation.currentKeyFrame) {
//         entity.morphTargetInfluences[entity.animation.lastKeyframe] = 0;
//         entity.morphTargetInfluences[entity.animation.currentKeyframe] = 1;
//         entity.morphTargetInfluences[entity.animation.keyframe] = 0;
//         entity.animation.lastKeyframe = entity.animation.currentKeyframe;
//         entity.animation.currentKeyframe = entity.animation.keyframe;
//       }
//       entity.morphTargetInfluences[entity.animation.keyframe] =
//         (time % entity.animation.interpolation) / entity.animation.interpolation;
//       entity.morphTargetInfluences[entity.animation.lastKeyframe] = 1 -
//         entity.morphTargetInfluences[entity.animation.keyframe];
//     } // End: key frame animation

//   }
// };
