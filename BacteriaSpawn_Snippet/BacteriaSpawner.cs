using UnityEngine;
using System.Collections;

//attach this class to an object in a Unity3D scene, and point a camera at it.
//It will cause the object to reproduce in a way that looks a bit like bacteria growing.
//try playing with the spawnChances, and spawnChanceMod variables!

public class BacteriaSpawner: MonoBehaviour {

	//magic number that modifies the chance any object will reproduce.
	public float spawnChanceMod = 10.0f;

	//how many chances does a particular piece have to spawn in its lifetime?
	public int spawnChances = 10;

	//how many are spawned in the world?
	static int numSpawned = 0;

	void Start () {

		numSpawned++;
		StartCoroutine(DoSpawn());

	}

	IEnumerator DoSpawn()
	{
		for(int i=0; i< spawnChances; i++)
		{
			//chance of spawning is inversely proportional to population size. This will result in the population finding balance around some maximum value.
			float spawnChance = spawnChanceMod * (1.0f / Mathf.Max(1.0f,numSpawned));

			//wait a bit between spawns, which gives the scene a bit more of a natural look
			yield return new WaitForSeconds( Random.Range(0.01f,0.2f) );

			if( Random.Range(0.0f, 1.0f) < spawnChance )
				SpawnOne();
		}

		numSpawned--;
		GameObject.Destroy(this.gameObject);


	}

	private void SpawnOne()
	{
		// we're going to spawn another one nearby.
		//note: this spawns in a randomized square on the X/Z plane. Try using a sphere or something instead!
		float spawnDist = 2.0f;
		Vector3 pos = transform.position + new Vector3(Random.Range(-spawnDist,spawnDist),0.0f, Random.Range(-spawnDist,spawnDist));

		//my gameObject serves as the "prefab" for futher spawns.
		GameObject.Instantiate(gameObject,pos, Quaternion.identity);
	}
}
